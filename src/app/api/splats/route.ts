import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, prompt } = body

        if (!name || !prompt) {
            return NextResponse.json(
                { error: 'Name and prompt are required' },
                { status: 400 }
            )
        }

        // Initialize Supabase client
        const supabase = await createClient();

        // Upload empty file to Supabase storage
        const { data, error } = await supabase.storage
            .from('splats')
            .upload(`splats/${Date.now()}.ply`, new Blob(), {
                contentType: 'application/octet-stream',
            });
        if (error) {
            console.error('Error uploading file to Supabase:', error)
            return NextResponse.json(
                { error: 'Failed to upload file to Supabase' },
                { status: 500 }
            )
        }

        // Create a new splat generation record
        const splatGeneration = await prisma.splatGeneration.create({
            data: {
                name,
                prompt,
                splatUrl: data.fullPath,
                status: 'pending',
            },
        })

        return NextResponse.json(splatGeneration, { status: 201 })
    } catch (error) {
        console.error('Error creating splat generation:', error)
        return NextResponse.json(
            { error: 'Failed to create splat generation' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const splatGenerations = await prisma.splatGeneration.findMany({
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(splatGenerations)
    } catch (error) {
        console.error('Error fetching splat generations:', error)
        return NextResponse.json(
            { error: 'Failed to fetch splat generations' },
            { status: 500 }
        )
    }
}
