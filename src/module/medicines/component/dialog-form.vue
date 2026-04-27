<template>
  <v-dialog v-model="controller.dialogForm.value" width="800" persistent scrollable>
    <v-form
      :disabled="controller.loading.value"
      :readonly="controller.readOnly.value"
      :ref="controller.formRef"
    >
      <v-card class="rounded-xl overflow-hidden">
        <v-card-title class="px-0 py-0">
          <v-toolbar
            :title="controller.readOnly.value ? 'Visualizar Medicamento' : 'Cadastrar Medicamento'"
            color="primary"
            density="compact"
            class="white--text"
            flat
          />
        </v-card-title>

        <v-card-text class="pa-6">
          <v-container fluid class="pa-0">
            <v-row justify="center" class="mb-6">
              <v-col cols="12" class="text-center">
                <template v-if="controller.readOnly.value">
                  <v-img
                    :src="controller.medicine.value.foto"
                    alt="Foto do medicamento"
                    width="150"
                    height="150"
                    class="rounded-lg elevation-2 mx-auto"
                    cover
                  />
                </template>
                <template v-else>
                  <v-text-field
                    label="Foto (URL)"
                    variant="outlined"
                    prepend-inner-icon="mdi-image-outline"
                    v-model="controller.medicine.value.foto"
                  />
                </template>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Nome do remédio"
                  variant="outlined"
                  prepend-inner-icon="mdi-pill"
                  :rules="[controller.rule.required]"
                  v-model="controller.medicine.value.nome_remedio"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="MG do remédio"
                  variant="outlined"
                  prepend-inner-icon="mdi-scale-balance"
                  v-model="controller.medicine.value.mg_remedio"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Dosagem"
                  variant="outlined"
                  prepend-inner-icon="mdi-water-percent"
                  v-model="controller.medicine.value.dosagem"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Intervalo de tempo"
                  variant="outlined"
                  prepend-inner-icon="mdi-clock-outline"
                  v-model="controller.medicine.value.tempo"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Por quantos dias?"
                  type="number"
                  variant="outlined"
                  prepend-inner-icon="mdi-calendar-range"
                  v-model.number="controller.medicine.value.qtd_dias_para_tomar"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Quantas embalagens?"
                  type="number"
                  variant="outlined"
                  prepend-inner-icon="mdi-package-variant"
                  v-model.number="controller.medicine.value.qtd_embalagem"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Quantos comprimidos?"
                  type="number"
                  variant="outlined"
                  prepend-inner-icon="mdi-counter"
                  v-model.number="controller.medicine.value.qtd_comprimidos"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Validade"
                  variant="outlined"
                  prepend-inner-icon="mdi-calendar"
                  v-maska="dateMask"
                  v-model="controller.medicine.value.dt_validade_remedio"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="controller.medicine.value.uso_continuo"
                  label="Uso contínuo?"
                  inset
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Quantidade diária (comprimidos)"
                  type="number"
                  variant="underlined"
                  :disabled="!controller.medicine.value.uso_continuo"
                  :rules="[
                    (value) => {
                      if (controller.medicine.value.uso_continuo && (!value || value <= 0)) {
                        return 'Quantidade diária é obrigatória'
                      }
                      return true
                    },
                  ]"
                  v-model.number="controller.medicine.value.qtd_diaria"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  label="Observação"
                  variant="outlined"
                  rows="3"
                  prepend-inner-icon="mdi-text-long"
                  auto-grow
                  v-model="controller.medicine.value.observacao"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4 d-flex align-center justify-space-between">
          <v-btn
            color="error"
            variant="outlined"
            prepend-icon="mdi-close"
            :disabled="controller.loading.value"
            @click="controller.cancel"
          >
            Cancelar
          </v-btn>

          <v-btn
            variant="flat"
            prepend-icon="mdi-content-save-outline"
            :loading="controller.loading.value"
            :disabled="controller.loading.value || controller.readOnly.value"
            @click="controller.save"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
defineProps({
  controller: {
    type: Object,
    required: true,
  },
})

const dateMask = { mask: '##/##/####' }
</script>
