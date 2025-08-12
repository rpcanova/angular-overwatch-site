export type VideoLink = {
    mp4: string
    webm: string
}

export type Ability = {
    name: string
    description: string
    icon?: string
    video?: {
        thumbnail: string
        link: VideoLink
    }
}

export type HeroData = {
    key: string
    name: string
    portrait: string
    role: string
    story: {
        summary: string
        media?: {
            type?: string
            link: string
            thumbnail?: string
        }
    }
    abilities?: Ability[]
    // Campos adicionais que podem estar na API
    location?: string
    age?: number
    base_of_operations?: string
    affiliation?: string
    difficulty?: number
    health?: {
        health: number
        armor: number
        shields: number
    }
    // Campos específicos da API OverFast
    release_date?: string
    description?: string
}