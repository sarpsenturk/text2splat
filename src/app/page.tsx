"use client"

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

// Mock data for previously generated splats
const previousSplats = [
  { id: 1, name: "Mountain Landscape", date: "2 hours ago" },
  { id: 2, name: "City Skyline", date: "1 day ago" },
  { id: 3, name: "Forest Scene", date: "3 days ago" },
  { id: 4, name: "Ocean Waves", date: "1 week ago" },
  { id: 5, name: "Desert Dunes", date: "2 weeks ago" },
]

function AppSidebar() {
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
                    <FileText className="h-4 w-4" />
                    <div className="flex flex-col">
                      <span className="text-sm">{splat.name}</span>
                      <span className="text-xs text-muted-foreground">{splat.date}</span>
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

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
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
      </div>
    </SidebarProvider>
  )
}
