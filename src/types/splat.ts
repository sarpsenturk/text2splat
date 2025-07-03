export interface SplatGeneration {
    id: string
    name: string
    prompt: string
    splatUrl: string
    status: 'pending' | 'generating' | 'completed' | 'failed'
    createdAt: Date
    updatedAt: Date
}

export interface CreateSplatGenerationRequest {
    name: string
    prompt: string
}
