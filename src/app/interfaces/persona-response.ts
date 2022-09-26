import { AboutResponse } from "./about-response"
import { ContactResponse } from "./contact-response"
import { EducationResponse } from "./education-response"
import { JobResponse } from "./job-response"
import { ProjectResponse } from "./project-response"
import { TechnologyResponse } from "./technology-response"

export interface PersonaResponse {
    id: number
    firstName: string 
    lastName: string
    about: AboutResponse
    jobList: JobResponse[] 
    educationList: EducationResponse[]
    technologyList: TechnologyResponse[]
    projectList: ProjectResponse[]
    contactList: ContactResponse[]
}
