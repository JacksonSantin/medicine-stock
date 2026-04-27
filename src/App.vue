<template>
  <router-view />
  <snackbar />
  <alert />
</template>

<script setup>
import Snackbar from '@/core/component/snackbar.vue'

import { useAlertProvider } from '@/composables/useAlert'
import Alert from '@/core/component/alert.vue'

useAlertProvider()
</script>

<style>
html,
body {
  overscroll-behavior: none;
  -webkit-overflow-scrolling: auto;
}
</style>
