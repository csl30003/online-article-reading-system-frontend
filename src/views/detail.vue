<template>
  <h1>
    id是：
    {{ id }}
  </h1>
  <h2>
    {{ article.id }}
    {{ article.title }}
    {{ article.content }}
  </h2>
  <div>
    <button @click="likeArticle">点赞</button>
    <button @click="cancelLike">取消点赞</button>
  </div>

</template>

<script setup>
import {useRouter} from "vue-router"
import instance from "@/axios";
import {inject, onMounted, reactive} from "vue";

// 校验身份
const checkToken = inject("checkToken")
let token = ""

const router = useRouter();
const id = router.currentRoute.value.params.id;

// 文章
let article = reactive({
  id: 0,
  title: '',
  content: '',
  createTime: '',
  updateTime: '',
  likes: 0,
  userId: 0,
  username: '',
  nickname: ''

})

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  if (!checkToken()) {
    // token过期了或者没有token，跳转登录页面
    await router.push("/")
  } else {
    token = localStorage.getItem('token')
    instance
        .get('http://127.0.0.1:8080/api/article/' + id,
            {
              headers: {
                'Authorization': token
              }
            })
        .then(res => {
          if (res.data.code === 1) {
            // 成功获取文章的详细信息
            article.id = res.data.data.id
            article.title = res.data.data.title
            article.content = res.data.data.content


          } else {
            alert(res.data.message)
          }
        })
  }

}

const likeArticle = () => {
  if (!checkToken()) {
    // token过期了或者没有token，跳转登录页面
    router.push("/")
  } else {
    console.log(token)
    instance
        .post('http://127.0.0.1:8080/api/article/' + id + "/like",
            {},
            {
              headers: {
                'Authorization': token
              }
            })
        .then(res => {
              if (res.data.code === 1) {
                // 成功获取文章的详细信息
                alert(res.data.message)
              } else {
                alert(res.data.message)
              }
            }
        )
  }

}


</script>

<style scoped>

</style>