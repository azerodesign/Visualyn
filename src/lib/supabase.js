import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper: Get current session
export const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
};

// Helper: Get current user
export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

// Helper: Sign out
export const signOut = async () => {
    await supabase.auth.signOut();
};

// Edge Function: Connect Social
export const connectSocial = async () => {
    const session = await getSession();
    if (!session) throw new Error('Not authenticated. Please log in.');

    const { data, error } = await supabase.functions.invoke('connect-social', {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    // Handle invoke-level errors (network, CORS, etc.)
    if (error) {
        console.error('Edge Function invoke error:', error);
        // Check if there's a response body with more details
        let detailedError = error.message || 'Unknown error calling Edge Function';
        if (error.context) {
            try {
                const body = typeof error.context === 'string'
                    ? JSON.parse(error.context)
                    : error.context;
                if (body?.error) detailedError = body.error;
            } catch (e) {
                // Ignore parse errors
            }
        }
        throw new Error(detailedError);
    }

    // Handle application-level errors returned by Edge Function
    if (data?.error) {
        throw new Error(data.error);
    }

    return data;
};

// Edge Function: Post Media
export const postMedia = async (caption, videoUrl, platforms) => {
    const session = await getSession();
    if (!session) throw new Error('Not authenticated');

    const res = await supabase.functions.invoke('post-media', {
        body: { caption, videoUrl, platforms },
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    if (res.error) throw new Error(res.error.message);
    return res.data;
};

// Helper: Upload asset to Storage and Database
export const uploadAsset = async (file) => {
    const session = await getSession();
    if (!session) throw new Error('Not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${session.user.id}/${Date.now()}.${fileExt}`;
    const type = file.type.startsWith('video/') ? 'video' : 'image';
    const bucket = type === 'video' ? 'videos' : 'assets';

    // 1. Upload to Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    // 3. Save to Database
    const { data: dbData, error: dbError } = await supabase
        .from('workspace_assets')
        .insert({
            user_id: session.user.id,
            type: type,
            url: publicUrl,
            title: file.name.split('.')[0],
            tags: []
        })
        .select()
        .single();

    if (dbError) {
        console.warn('Failed to save to database, using storage URL only:', dbError);
        return {
            id: Date.now(),
            type,
            url: publicUrl,
            title: file.name.split('.')[0],
            tags: []
        };
    }

    return dbData;
};

// Helper: Fetch user assets
export const fetchAssets = async () => {
    const session = await getSession();
    if (!session) return [];

    const { data, error } = await supabase
        .from('workspace_assets')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.warn('Failed to fetch assets:', error);
        return [];
    }

    return data;
};
