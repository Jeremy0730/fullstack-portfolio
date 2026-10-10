import { defineStore } from 'pinia'
import { ref } from 'vue'

const DARK_KEY = 'nl-dark'

export const useAppStore = defineStore('app', () => {
  const collapsed = ref(window.matchMedia('(max-width: 960px)').matches)
  const dark = ref(localStorage.getItem(DARK_KEY) === '1')

  function applyTheme() {
    document.documentElement.classList.toggle('dark', dark.value)
  }

  function toggleDark() {
    dark.value = !dark.value
    localStorage.setItem(DARK_KEY, dark.value ? '1' : '0')
    applyTheme()
  }

  function toggleCollapse() {
    collapsed.value = !collapsed.value
  }

  return { collapsed, dark, applyTheme, toggleDark, toggleCollapse }
})
