import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { FileText, Sparkles, History } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { SplatGenerationForm } from "@/components/SplatGenerationForm"
import { ModeToggle } from "@/components/mode-toggle"

async function getSplatGenerations() {
  const splats = await prisma.splatGeneration.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10, // Get the latest 10 splats
  })

  return splats.map(splat => ({
    id: splat.id,
    name: splat.name,
    date: formatRelativeTime(splat.createdAt),
    status: splat.status,
    splatUrl: splat.splatUrl,
  }))
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))

  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'Just now'
}

async function AppSidebar() {
  const previousSplats = await getSplatGenerations()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Previous Splats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {previousSplats.map((splat) => (
                <SidebarMenuItem key={splat.id}>
                  <SidebarMenuButton asChild>
                    <a
                      href={`/status/${splat.id}`}
                      className="flex items-center gap-2 w-full"
                    >
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm truncate" title={splat.name}>{splat.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground truncate">{splat.date}</span>
                          {splat.status === 'pending' && (
                            <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-1.5 py-0.5 rounded text-center">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function MainContent() {
  return (
    <main className="flex-1 flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="mr-2" />
            <Sparkles className="h-6 w-6" />
            <h1 className="text-lg font-semibold">Text2Splat</h1>
          </div>
          <ModeToggle />
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <SplatGenerationForm />
      </div>
    </main>
  )
}

export default async function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <MainContent />
      </div>
    </SidebarProvider>
  )
}
