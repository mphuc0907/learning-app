export const TOKEN_COOKIE = 'token'
export const USER_COOKIE  = 'user'

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
