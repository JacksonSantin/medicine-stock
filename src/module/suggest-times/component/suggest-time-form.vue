<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 90vh">
    <v-card elevation="8" class="pa-8 rounded-xl" max-width="480">
      <v-card-title class="justify-center pa-0 mb-6">
        <h2 class="text-h5 font-weight-bold text-primary">Sugestão de Horários</h2>
      </v-card-title>

      <v-form :ref="controller.formRef" :disabled="controller.loading.value" class="w-100">
        <v-text-field
          label="Intervalo entre horários (em horas)"
          type="number"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-clock-outline"
          :rules="[controller.rule.required]"
          v-model.number="controller.suggest.value.hours"
        />

        <v-btn
          class="mt-6 w-100"
          variant="flat"
          prepend-icon="mdi-content-save-outline"
          :loading="controller.loading.value"
          :disabled="controller.loading.value"
          @click="controller.save"
        >
          Gerar horários
        </v-btn>

        <v-expand-transition>
          <div v-if="controller.suggestedTimes.value.length" class="mt-8">
            <v-divider class="mb-4" />
            <h3 class="text-h6 font-weight-medium mb-4 text-center text-primary">
              Horários sugeridos
            </h3>

            <v-row justify="center" align="center" class="gap-2">
              <v-chip
                v-for="(time, index) in controller.suggestedTimes.value"
                :key="index"
                color="primary"
                class="ma-1 px-4"
                label
                variant="elevated"
              >
                {{ time }}
              </v-chip>
            </v-row>
          </div>
        </v-expand-transition>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
defineProps({
  controller: {
    type: Object,
    required: true,
  },
})
</script>
