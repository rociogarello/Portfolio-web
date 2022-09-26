import { TechnologyResponse } from "./technology-response"

export interface ProjectResponse {
    id: number
    projectName: string
    description: string
    site: string
    image: string
    technologyList: TechnologyResponse[]
}
