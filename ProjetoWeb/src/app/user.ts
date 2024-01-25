import { Access } from "./access"

export interface User {
    id: number
    name: string
    email: string
    password: string
    cpf: string
    access: Access
}