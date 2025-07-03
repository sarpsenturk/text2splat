import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create some sample splat generations
    await prisma.splatGeneration.createMany({
        data: [
            {
                name: "Mountain Landscape",
                prompt: "A beautiful mountain landscape with snow-capped peaks and a clear blue sky",
                splatUrl: "https://example.com/splats/mountain-landscape.splat",
                status: "completed",
            },
            {
                name: "City Skyline",
                prompt: "A modern city skyline at sunset with tall buildings and glass facades",
                splatUrl: "https://example.com/splats/city-skyline.splat",
                status: "completed",
            },
            {
                name: "Forest Scene",
                prompt: "A dense forest with tall trees and dappled sunlight filtering through leaves",
                splatUrl: "https://example.com/splats/forest-scene.splat",
                status: "completed",
            },
            {
                name: "Ocean Waves",
                prompt: "Ocean waves crashing against a rocky coastline with seabirds flying overhead",
                splatUrl: "https://example.com/splats/ocean-waves.splat",
                status: "completed",
            },
            {
                name: "Desert Dunes",
                prompt: "Rolling sand dunes in the Sahara desert under a starry night sky",
                splatUrl: "https://example.com/splats/desert-dunes.splat",
                status: "completed",
            },
        ],
    })

    console.log('Seed data created successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
