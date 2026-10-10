import { defineStore } from 'pinia'
import { ref } from 'vue'

const TOKEN_KEY = 'nl-token'
const NAME_KEY = 'nl-name'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) ?? '')
  const name = ref(localStorage.getItem(NAME_KEY) ?? 'Jeremy')

  function login(username: string, password: string) {
    if (username.trim() === 'admin' && password === 'admin123') {
      token.value = 'demo-token'
      name.value = 'Jeremy'
      localStorage.setItem(TOKEN_KEY, token.value)
      localStorage.setItem(NAME_KEY, name.value)
      return true
    }
    return false
  }

  function logout() {
    token.value = ''
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(NAME_KEY)
  }

  return { token, name, login, logout }
})
