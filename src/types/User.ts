export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    github?: string;
    education?: string;
    profile?: string;
    careers?: Career[];
    skills?: {
        programming: string[];
        frameworks: string[];
    };
    certifications?: string[];
}

interface Career {
    company: string;
    position?: string;
    startDate: string;
    endDate?: string;
    descriptions: string[];
}