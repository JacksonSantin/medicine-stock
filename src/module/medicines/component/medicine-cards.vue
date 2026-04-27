<template>
  <v-card elevation="4" class="pa-4 d-flex flex-column justify-space-between h-100">
    <div class="d-flex align-center mb-3">
      <v-avatar :size="48" :image="medicine.foto"></v-avatar>
      <div class="ml-3">
        <div class="text-h6 font-weight-bold">{{ medicine.nome_remedio }}</div>
      </div>
    </div>

    <div class="mb-2">
      <strong>Observação:</strong>
      <div>
        {{
          medicine.observacao && medicine.observacao.length > 80
            ? medicine.observacao.slice(0, 80) + '...'
            : medicine.observacao
        }}
      </div>
    </div>

    <div class="d-flex flex-wrap gap-2 mb-2">
      <v-chip
        v-if="medicine.dt_validade_remedio"
        :color="controller.getStatusChip('validade', medicine.dt_validade_remedio).cor"
        size="small"
        dark
      >
        <v-icon left class="mr-1">
          {{ controller.getStatusChip('validade', medicine.dt_validade_remedio).icone }}
        </v-icon>
        {{ controller.getStatusChip('validade', medicine.dt_validade_remedio).texto }}
      </v-chip>

      <v-chip
        :color="controller.getStatusChip('quantidade', medicine.qtd_comprimidos).cor"
        size="small"
        dark
      >
        <v-icon left class="mr-1">
          {{ controller.getStatusChip('quantidade', medicine.qtd_comprimidos).icone }}
        </v-icon>
        {{ controller.getStatusChip('quantidade', medicine.qtd_comprimidos).texto }}
      </v-chip>
    </div>

    <div class="mb-3">
      <strong>Validade:</strong>
      <span>
        {{
          medicine.dt_validade_remedio
            ? dayjs.utc(medicine.dt_validade_remedio).format('DD/MM/YYYY')
            : 'N/A'
        }}
      </span>
    </div>

    <div class="d-flex justify-end gap-2 mt-auto">
      <v-tooltip location="bottom" text="Visualizar">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-eye"
            color="green"
            variant="text"
            @click.stop="controller.show(medicine)"
          />
        </template>
      </v-tooltip>

      <v-tooltip location="bottom" text="Alterar">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-pencil"
            color="orange"
            variant="text"
            @click.stop="controller.update(medicine)"
          />
        </template>
      </v-tooltip>

      <v-tooltip location="bottom" text="Deletar">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-trash-can-outline"
            color="red"
            variant="text"
            @click.stop="controller.remove(medicine)"
          />
        </template>
      </v-tooltip>
    </div>
  </v-card>
</template>

<script setup>
import dayjs from 'dayjs'

defineProps({
  controller: { type: Object, required: true },
  medicine: { type: Object, required: true },
})
</script>

<style scoped>
.v-card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}
</style>
