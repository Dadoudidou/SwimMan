export namespace UserSchema {
    
export interface IRequestUser {
    id: number
    pseudo: string
    first_name: string
    last_name: string
    last_connected: string
    groups: Partial<IRequestGroup>
}

export interface IRequestGroup {
    id: number
    nom: string
    permissions: Partial<IRequestPermission>
    users: Partial<IRequestUser>
}

export interface IRequestPermission {
    id: number
    name: string
    description: string
    groups: Partial<IRequestGroup>
}

export interface IResponseUser {
    id: number
    pseudo: string
    first_name: string
    last_name: string
    last_connected: string
    groups: Partial<IResponseGroup>[]
}

export interface IResponseGroup {
    id: number
    nom: string
    permissions: Partial<IResponsePermission>[]
    users: Partial<IResponseUser>[]
}

export interface IResponsePermission {
    id: number
    name: string
    description: string
    groups: Partial<IResponseGroup>[]
}

}