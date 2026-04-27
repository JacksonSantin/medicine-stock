<template>
  <suggest-time-form :controller="controller" />
</template>

<script setup>
import { suggestTimesControllerImpl } from '../di/di'

import SuggestTimeForm from '../component/suggest-time-form.vue'

const controller = suggestTimesControllerImpl()
</script>
