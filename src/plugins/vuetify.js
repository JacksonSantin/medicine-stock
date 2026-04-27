import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { pt } from 'vuetify/locale'

// Ícones
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const light = {
  dark: false,
  colors: {
    background: '#ffffff',
    surface: '#FFFFFF',
    primary: '#354565',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

const dark = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#4d79bb',
    'primary-darken-1': '#375787',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  locale: {
    locale: 'pt',
    fallback: 'pt',
    messages: { pt },
  },
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  defaults: {
    VBtn: { color: 'primary', size: 'small', variant: 'elevated' },
    VList: { density: 'compact' },
    VToolbar: { density: 'compact' },
    VSelect: { density: 'compact', variant: 'underlined' },
    VAutocomplete: {
      density: 'compact',
      variant: 'underlined',
      color: 'primary',
    },
    VTextField: { density: 'compact', variant: 'filled', color: 'primary' },
    VIcon: { size: 'small' },
    VCheckbox: { density: 'compact', color: 'primary' },
    VRadio: { density: 'compact', color: 'primary' },
    VRadioGroup: { density: 'compact', color: 'primary' },
    VTextarea: { density: 'compact', variant: 'underlined' },
    VSwitch: { color: 'primary', flat: true },
    VRow: { dense: true },
  },
})
