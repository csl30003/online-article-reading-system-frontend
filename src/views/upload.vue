<template>
  <div class="container">
    <button class="back" @click="back">返回</button>
    <h1 class="title">上传文章</h1>
    <form>
      <div class="form-group">
        <label for="title">标题：</label>
        <input type="text" id="title" v-model="title" required>
      </div>
      <div class="form-group">
        <label for="content">内容：</label>
        <input type="text" id="content" v-model="content" required>
      </div>
      <button class="submit-btn" @click="submit">上传</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import instance from "@/axios"
import { inject } from "vue";
import { useRouter } from "vue-router"

// 路由
const router = useRouter()

// 校验身份
const checkToken = inject("checkToken")
let token = ""

const title = ref('')
const content = ref('')

const back = () => {
  router.push('/home')
}

const submit = async () => {
  if (!checkToken()) {
    // token过期了或者没有token，跳转登录页面
    await router.push("/")
  } else {
    token = localStorage.getItem('token')
    instance.post('<http://127.0.0.1:8080/api/article/upload>', {
          title: title.value,
          content: content.value,
        },
        {
          headers: {
            'Authorization': token
          }
        }).then(res => {
      if (res.data.code === 1) {
        alert('上传成功')
        // 清楚输入框内容
        title.value = ''
        content.value = ''

      } else {
        alert(res.data.msg)
      }
    })
  }
}

</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}

.back {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 8px 16px;
  background-color: #28a745;
  border-radius: 20px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 32px;
  color: #28a745;
}

.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: inline-block;
  margin-bottom: 6px;
  font-size: 18px;
  color: #28a745;
}

input[type="text"] {
  width: 100%;
  height: 40px;
  padding: 8px 16px;
  border: 2px solid #28a745;
  border-radius: 20px;
  font-size: 16px;
  color: #28a745;
}

.submit-btn {
  margin-top: 16px;
  padding: 8px 24px;
  background-color: #28a745;
  border-radius: 20px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.submit-btn:hover {
  background-color: #fff;
  color: #28a745;
  border: 2px solid #28a745;
}
</style>
