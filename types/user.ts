export interface User {
  name: string
  lastName: string
  email: string
  password: string
  phone: string
  country: string
  state?: string
  city?: string
  address?: string
  ine?: string
  isVerified: boolean
  isEmailVerified: boolean
  token: string
  createdAt: Date
  updatedAt: Date
}