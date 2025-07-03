import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create sample splat generation
    await prisma.splatGeneration.createMany({
        data: [
            {
                name: "A beautiful dress made out of feathers on a mannequin",
                prompt: "A beautiful dress made out of feathers on a mannequin",
                splatUrl: "http://localhost:8000/A_beautiful_dress_made_out_of_feathers_on_a_mannequin.splat",
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
