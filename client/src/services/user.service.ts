import axios from 'axios'
import type { User, NewUser } from '@/models/user.model'

const API_BASE = 'http://localhost:3000/api/users'

export async function getAllUsers (): Promise<User[]> {
  const response = await axios.get(API_BASE)
  return response.data
}

export async function createUser (data: NewUser): Promise<User> {
  const response = await axios.post(API_BASE, data)
  return response.data.user
}

export async function getUserById (id: string): Promise<User> {
  const response = await axios.get(`${API_BASE}/${id}`)
  return response.data
}