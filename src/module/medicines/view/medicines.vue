<template>
  <v-col cols="12">
    <v-card height="calc(100vh - 70px)" class="overflow-y-auto">
      <v-skeleton-loader v-if="controller.loading.value" type="table" />

      <v-container v-else fluid>
        <div class="mt-4 d-flex flex-wrap justify-end gap-2 mb-4">
          <v-text-field
            label="Pesquisar"
            max-width="300"
            class="px-2"
            v-model="controller.search.value"
            density="compact"
            variant="outlined"
          />
          <v-btn
            height="40"
            color="primary"
            prepend-icon="mdi-plus"
            :disabled="controller.loading.value"
            :loading="controller.loading.value"
            @click="controller.add"
          >
            Incluir
          </v-btn>
        </div>

        <v-row v-if="!controller.rows.value.length">
          <empty-state />
        </v-row>

        <v-row v-else dense>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="medicine in controller.rows.value"
            :key="medicine.id"
          >
            <medicine-cards :medicine="medicine" :controller="controller" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>

  <dialog-form :controller="controller" />
</template>

<script setup>
import { medicinesControllerImpl } from '../di/di'
import MedicineCards from '../component/medicine-cards.vue'
import DialogForm from '../component/dialog-form.vue'
import EmptyState from '@/core/component/empty-state.vue'

const controller = medicinesControllerImpl()
</script>
