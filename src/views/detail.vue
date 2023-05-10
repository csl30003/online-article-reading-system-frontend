<template>
  <h1>
    id是：
    {{ id }}
  </h1>
</template>

<script setup>
import {useRouter} from "vue-router"

const router = useRouter();
const id = router.currentRoute.value.params.id
</script>

<style scoped>

</style>