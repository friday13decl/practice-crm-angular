export interface User {
  email: string
  password: string
}

export interface Category {
  _id?: string
  name: string
  imageSrc?: string
  user?: string
}

export interface ServerMessage {
  message: string
}
