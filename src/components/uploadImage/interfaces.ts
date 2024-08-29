export type uploadImageProps = {
    maxSize: number,
    idImage: number | null,
    setIdImage: (newValue: number | null) => void
    url?: string | null
    type: 'image'|'cert'
}

export type uploadImageType = {
    description?: string
    userId: number
    host: string
    owner: string
    module?:string
}