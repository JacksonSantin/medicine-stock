<template>
  <register-form :controller="controller" />
</template>

<script setup>
import { registerControllerImpl } from '../di/di'

import RegisterForm from '../component/register-form.vue'

const controller = registerControllerImpl()
</script>
