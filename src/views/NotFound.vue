<template>
  <v-container
    class="d-flex flex-column align-center justify-center text-center"
    style="min-height: 100vh"
  >
    <v-card
      elevation="8"
      class="pa-10 rounded-xl d-flex flex-column align-center justify-center"
      max-width="480"
    >
      <div class="mb-6">
        <img :src="logo" alt="Logo" style="max-width: 120px; height: auto" />
      </div>

      <v-icon size="64" color="primary" class="mb-4"> mdi-alert-circle-outline </v-icon>

      <h1 class="text-h4 font-weight-bold mb-2 text-primary">Whoops, 404</h1>

      <p class="text-subtitle-1 text-medium-emphasis mb-6">
        A página que você procura não existe ou está em manutenção.
      </p>

      <v-btn prepend-icon="mdi-arrow-left" variant="flat" rounded="lg" @click="$router.push('/')">
        Voltar ao início
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import logo from '@/assets/logo.png'
</script>
