export interface JobRequest {
    startDate: string | null
    endDate: string | null
    companyName: string
    jobRole: string
    jobDescription: string
    personaId: number | null
    isPresent: boolean
}
