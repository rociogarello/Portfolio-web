export interface ProjectRequest {
    projectName: string
    description: string
    site: string
    image: string
    personaId: number | null
    technologiesId: number[]
}
