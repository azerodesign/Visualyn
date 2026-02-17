import * as React from "react"
import {
    LayoutGrid, Share2, Wand2, MessageSquare, Cloud, BookOpen, Settings,
    LogOut, ChevronRight, User, Palette, Zap
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

const items = [
    {
        title: "Menu",
        links: [
            { id: "portfolio", title: "Workspace", icon: LayoutGrid },
            { id: "social", title: "Social Publish", icon: Share2 },
            { id: "tools", title: "Creative Tools", icon: Wand2 },
        ],
    },
    {
        title: "Support",
        links: [
            { id: "testimonials", title: "Testimonials", icon: MessageSquare },
            { id: "sync", title: "Sync Portfolio", icon: Cloud },
            { id: "docs", title: "User Guide", icon: BookOpen },
            { id: "settings", title: "Settings", icon: Settings },
        ],
    },
]

export function AppSidebar({ user, activeTab, setActiveTab, signOut, ...props }) {
    return (
        <Sidebar collapsible="icon" className="border-r border-white/5 sidebar-glass" {...props}>

            <SidebarContent>
                {items.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-600 px-4 mb-1 group-data-[collapsible=icon]:hidden">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.links.map((item) => (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={activeTab === item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            tooltip={item.title}
                                            className={`h-10 px-4 transition-all duration-200 ${activeTab === item.id
                                                ? "bg-lime-500/10 text-lime-400 font-bold"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <button>
                                                <item.icon className={activeTab === item.id ? "text-lime-400" : ""} />
                                                <span className="font-bold tracking-tight group-data-[collapsible=icon]:hidden">{item.title}</span>
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-white/5 bg-black/10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-lime-400 to-green-600 flex items-center justify-center text-black font-extrabold uppercase shrink-0">
                                {user?.email?.charAt(0) || 'U'}
                            </div>
                            <div className="text-[10px] truncate flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                                <p className="font-black text-white truncate uppercase tracking-wider">
                                    {user?.email?.split('@')[0] || 'User'}
                                </p>
                                <p className="text-slate-500 font-bold italic">PRO MEMB</p>
                            </div>
                            <button
                                onClick={signOut}
                                className="p-1.5 text-slate-500 hover:text-red-400 transition-all group-data-[collapsible=icon]:hidden"
                                title="Sign Out"
                            >
                                <LogOut size={14} />
                            </button>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
