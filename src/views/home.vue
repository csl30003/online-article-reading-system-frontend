<template>
<button @click="demo">demo</button>
</template>

<script setup>
import {inject} from "vue";
// import instance from "@/axios"

const checkToken = inject("checkToken")
let token = ""

const demo = () => {
  if (!checkToken()) {
    // token过期了或者没有token，跳转登录页面
  } else {
    token = localStorage.getItem('token')
    alert(token)
    // instance.post('/api/user/demo', {}, {
    //   headers: {
    //     'Authorization': token
    //   }
    // })
  }
}
</script>

<style scoped>

</style>