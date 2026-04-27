<template>
  <v-app>
    <v-layout>
      <v-app-bar color="background" density="compact" flat>
        <v-app-bar-nav-icon class="d-sm-none" @click="drawer = !drawer" />

        <v-img
          class="d-none d-sm-flex"
          max-width="120"
          height="40"
          contain
          alt="Logo"
          :src="controller.themeName.value === 'dark' ? logoDark : logo"
        />

        <v-spacer />

        <div class="d-none d-sm-flex align-center justify-center">
          <v-btn
            class="mx-2"
            :variant="controller.activeButton.value === 'medicines' ? 'tonal' : 'text'"
            prepend-icon="mdi-pill"
            @click="controller.navigate('medicines')"
          >
            Remédios
          </v-btn>

          <v-divider vertical />

          <v-btn
            class="mx-2"
            :variant="controller.activeButton.value === 'suggest-times' ? 'tonal' : 'text'"
            prepend-icon="mdi-clock-outline"
            @click="controller.navigate('suggest-times')"
          >
            Sugestões
          </v-btn>

          <v-divider vertical />

          <v-btn
            class="mx-2"
            :variant="controller.activeButton.value === 'prescription' ? 'tonal' : 'text'"
            prepend-icon="mdi-file-document-outline"
            disabled
            @click="controller.navigate('prescription')"
          >
            Receitas
          </v-btn>
        </div>

        <v-spacer />

        <v-tooltip location="bottom" text="Trocar tema">
          <template #activator="{ props }">
            <v-btn icon="mdi-theme-light-dark" v-bind="props" @click="controller.toggleTheme" />
          </template>
        </v-tooltip>

        <v-tooltip location="bottom" text="Sair">
          <template #activator="{ props }">
            <v-btn icon="mdi-exit-to-app" v-bind="props" @click="controller.handleLogout" />
          </template>
        </v-tooltip>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" temporary class="d-sm-none">
        <v-sheet color="background" class="pa-4 text-center">
          <v-img
            :width="100"
            aspect-ratio="16/9"
            cover
            :src="controller.themeName.value === 'dark' ? logoDark : logo"
          />
        </v-sheet>

        <v-divider class="my-2" />

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-pill"
            title="Remédios"
            @click="navigateAndClose('medicines')"
          />
          <v-list-item
            prepend-icon="mdi-clock-outline"
            title="Sugestões"
            @click="navigateAndClose('suggest-times')"
          />
          <v-list-item
            prepend-icon="mdi-file-document-outline"
            title="Receitas"
            disabled
            @click="navigateAndClose('prescription')"
          />
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <component v-if="controller.component.value" :is="controller.component.value" />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { skeletonControllerImpl } from '../di/di'
import logo from '@/assets/logo.png'
import logoDark from '@/assets/logo-dark.png'

const controller = skeletonControllerImpl()
const drawer = ref(false)

const navigateAndClose = (route) => {
  controller.navigate(route)
  drawer.value = false
}
</script>
