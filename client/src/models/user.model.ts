export interface User {
  _id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface NewUser {
  name: string
  email: string
}