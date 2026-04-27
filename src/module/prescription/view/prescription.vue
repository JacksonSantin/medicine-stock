<template>
  <component v-if="controller.component.value" :is="controller.component.value" />

  <v-container
    class="d-flex flex-column align-center justify-center text-center"
    style="min-height: 100vh"
  >
    <v-card
      elevation="8"
      class="pa-10 rounded-xl d-flex flex-column align-center justify-center"
      max-width="480"
    >
      <v-icon size="64" color="primary" class="mb-4"> mdi-crane </v-icon>

      <h1 class="text-h4 font-weight-bold mb-2 text-primary">Área em construção</h1>

      <p class="text-subtitle-1 text-medium-emphasis mb-6">
        Em breve você poderá lançar e armazenar aqui as receitas para consultas posteriores.
      </p>

      <v-btn prepend-icon="mdi-arrow-left" variant="flat" rounded="lg" @click="controller.back">
        Voltar ao início
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { prescriptionControllerImpl } from '../di/di'
const controller = prescriptionControllerImpl()
</script>
