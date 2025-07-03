import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
                  <SidebarMenuButton>
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm truncate" title={splat.name}>{splat.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{splat.date}</span>
                    </div>
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
        <div className="flex h-14 items-center px-4 lg:px-6">
          <SidebarTrigger className="mr-2" />
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <h1 className="text-lg font-semibold">Text2Splat</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-center">Generate 3D Gaussian Splat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium">
                Enter your text prompt
              </label>
              <Textarea
                id="prompt"
                placeholder="Describe the scene you want to generate..."
                className="min-h-[100px] resize-none"
                rows={4}
              />
            </div>
            <Button className="w-full" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Splat
            </Button>
          </CardContent>
        </Card>
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
