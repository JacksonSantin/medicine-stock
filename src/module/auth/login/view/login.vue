<template>
  <login-form :controller="controller" />
</template>

<script setup>
import { loginControllerImpl } from '../di/di'

import LoginForm from '../component/login-form.vue'

const controller = loginControllerImpl()
</script>
