export type SessionUser = {
  id: number
  username: string
  firstName?: string
  lastName?: string
  email?: string
  image?: string
}

export type LoginInput = {
  email?: string  
  username?: string 
  password: string
}
