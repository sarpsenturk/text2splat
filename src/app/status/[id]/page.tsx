import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, Clock, Download, Eye } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"

interface StatusPageProps {
    params: {
        id: string
    }
}

async function getSplatGeneration(id: string) {
    const splat = await prisma.splatGeneration.findUnique({
        where: { id }
    })

    if (!splat) {
        notFound()
    }

    return splat
}

export default async function StatusPage({ params }: StatusPageProps) {
    const splat = await getSplatGeneration(params.id)

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'pending':
                return {
                    icon: <Clock className="h-5 w-5 text-yellow-500" />,
                    text: 'Pending',
                    description: 'Your splat generation is queued and waiting to be processed.'
                }
            case 'generating':
                return {
                    icon: <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />,
                    text: 'Generating',
                    description: 'Your splat is currently being generated. This may take a few minutes.'
                }
            case 'completed':
                return {
                    icon: <div className="h-5 w-5 bg-green-500 rounded-full" />,
                    text: 'Completed',
                    description: 'Your splat has been successfully generated!'
                }
            case 'failed':
                return {
                    icon: <div className="h-5 w-5 bg-red-500 rounded-full" />,
                    text: 'Failed',
                    description: 'There was an error generating your splat. Please try again.'
                }
            default:
                return {
                    icon: <Clock className="h-5 w-5 text-muted-foreground" />,
                    text: 'Unknown',
                    description: 'Status unknown.'
                }
        }
    }

    const statusDisplay = getStatusDisplay(splat.status)
    const createdAt = new Date(splat.createdAt).toLocaleString()

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="w-full max-w-2xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                <Card className="border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            {statusDisplay.icon}
                            <div>
                                <h1 className="text-2xl font-bold">{splat.name}</h1>
                                <p className="text-sm text-muted-foreground font-normal">Status: {statusDisplay.text}</p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{statusDisplay.description}</p>

                        <div className="space-y-2">
                            <h3 className="font-semibold">Prompt:</h3>
                            <p className="bg-muted p-3 rounded-lg border">
                                {splat.prompt}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                                <h4 className="font-medium">Created:</h4>
                                <p className="text-sm text-muted-foreground">{createdAt}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">ID:</h4>
                                <p className="text-sm text-muted-foreground font-mono truncate">{splat.id}</p>
                            </div>
                        </div>

                        {splat.status === 'completed' && (
                            <div className="pt-4 space-y-3">
                                <div className="flex gap-3">
                                    <Button asChild className="flex-1" size="lg">
                                        <a
                                            href={`https://antimatter15.com/splat/?url=${encodeURIComponent(splat.splatUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Splat
                                        </a>
                                    </Button>
                                    <Button asChild variant="outline" className="flex-1" size="lg">
                                        <a
                                            href={splat.splatUrl}
                                            download
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        )}

                        {(splat.status === 'pending' || splat.status === 'generating') && (
                            <div className="pt-4">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                >
                                    Refresh Status
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
