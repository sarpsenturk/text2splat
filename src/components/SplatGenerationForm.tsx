'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'

export function SplatGenerationForm() {
    const [prompt, setPrompt] = useState('')
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!prompt.trim() || !name.trim()) {
            alert('Please enter both a name and prompt')
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch('/api/splats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    prompt: prompt.trim(),
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to create splat')
            }

            const result = await response.json()
            console.log('Splat created:', result)

            // Clear form
            setPrompt('')
            setName('')

            // Refresh the page to show the new splat in the sidebar
            router.refresh()

        } catch (error) {
            console.error('Error creating splat:', error)
            alert(error instanceof Error ? error.message : 'Failed to create splat')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-center">Generate 3D Gaussian Splat</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Splat Name
                        </label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter a name for your splat..."
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="prompt" className="text-sm font-medium">
                            Enter your text prompt
                        </label>
                        <Textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the scene you want to generate..."
                            className="min-h-[100px] resize-none"
                            rows={4}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Generate Splat
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
