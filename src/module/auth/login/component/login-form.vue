<template>
  <v-container class="d-flex flex-column align-center justify-center" style="height: 100vh">
    <v-card class="pa-8 rounded-xl" style="width: 400px; max-width: 100%" elevation="8">
      <v-card-title class="text-h5 font-weight-bold justify-center">Login</v-card-title>

      <v-form @submit.prevent="controller.onLogin" ref="form">
        <v-text-field
          v-model="controller.email.value"
          label="E-mail"
          type="email"
          variant="outlined"
          prepend-inner-icon="mdi-email-outline"
          required
        />

        <v-text-field
          v-model="controller.password.value"
          label="Senha"
          type="password"
          variant="outlined"
          prepend-inner-icon="mdi-lock-outline"
          required
        />

        <v-btn
          type="submit"
          class="mt-4"
          block
          :loading="controller.loading.value"
          :disabled="controller.loading.value"
        >
          Entrar
        </v-btn>
      </v-form>

      <v-alert v-if="error" type="error" class="mt-3" density="compact">
        {{ error }}
      </v-alert>

      <div class="text-center mt-4">
        <span class="mr-5">Não tem conta?</span>
        <v-btn variant="text" @click="$router.push('/register')">Cadastre-se</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import useAuth from '@/composables/useAuth'

const { error } = useAuth()

defineProps({
  controller: {
    type: Object,
    required: true,
  },
})
</script>
