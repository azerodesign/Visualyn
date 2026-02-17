import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser
function loadEnv(filePath) {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf-8');
    content.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
        }
    });
}

loadEnv(path.join(__dirname, '.env'));

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
    console.log('Checking Storage Buckets...');
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error('Error fetching buckets:', error.message);
        return;
    }

    const requiredBuckets = ['videos', 'assets'];
    const existingBuckets = buckets.map(b => b.name);

    for (const bucket of requiredBuckets) {
        if (existingBuckets.includes(bucket)) {
            console.log(`✅ Bucket "${bucket}" exists.`);
        } else {
            console.log(`❌ Bucket "${bucket}" is missing. Attempting to create...`);
            const { data, error: createError } = await supabase.storage.createBucket(bucket, {
                public: true,
            });
            if (createError) {
                console.error(`Failed to create bucket "${bucket}":`, createError.message);
            } else {
                console.log(`✅ Bucket "${bucket}" created successfully.`);
            }
        }
    }
}

checkStorage();
