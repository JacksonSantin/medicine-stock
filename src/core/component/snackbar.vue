<template>
  <v-snackbar
    v-model="snackbar.state.show"
    :color="snackbar.state.color"
    :timeout="snackbar.state.timeout"
    location="top right"
    multi-line
  >
    <div v-html="snackbar.state.message" />

    <template v-slot:actions>
      <v-btn color="white" @click="snackbar.close()" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useSnackbar } from '@/composables/useSnackbar'
const snackbar = useSnackbar()
</script>
