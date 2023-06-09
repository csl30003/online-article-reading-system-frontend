<template>
  <div>
    <ul class="rolldown-list" id="myList">
      <li v-for="(item, index) in paginatedItems" :key="index" @click="goToDetail(item.id)">
        <div class="title">{{ item.title }}</div>
        <div class="content">{{ item.content }}</div>
      </li>
    </ul>
  </div>

  <h1 class="main-title">看世界</h1>

  <button class="rank" @click="rank">排行榜</button>

  <button class="upload" @click="upload">上传文章</button>

  <div class="pagination">
    <button :disabled="currentPage === 1" @click="prevPage">上一页</button>
    <button v-for="page in pages" :key="page" :class="{active: currentPage === page}" @click="currentPage = page">
      {{ page }}
    </button>
    <button :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, computed} from 'vue'
import instance from "@/axios"
import {inject} from "vue";
import {useRouter} from "vue-router"

// 路由
const router = useRouter()

// 校验身份
const checkToken = inject("checkToken")
let token = ""

// 文章列表
const items = ref([])

// 页
const currentPage = ref(1)
const size = 10

// 进入页面前执行
onMounted(() => {
  // 获取数据
  fetchData()

  // 动画效果
  const listItems = document.querySelectorAll('.rolldown-list li')
  listItems.forEach((item, index) => {
    const delay = `${index / 4}s`
    item.style.webkitAnimationDelay = delay
    item.style.mozAnimationDelay = delay
    item.style.animationDelay = delay
  })
})

// 获取数据
const fetchData = async () => {
  if (!checkToken()) {
    // token过期了或者没有token，跳转登录页面
    await router.push("/")
  } else {
    token = localStorage.getItem('token')
    instance
        .get(`http://127.0.0.1:8080/api/article/list`,
            {
              params: {
                'page': currentPage.value,
                'size': size,
                'keyword': ''
              },
              headers: {
                'Authorization': token
              }
            })
        .then(res => {
          if (res.data.code === 1) {
            // 循环获取文章标题
            items.value = res.data.data.content
          } else {
            alert(res.data.msg)
          }
        })
  }

}

// 查看文章详情
const goToDetail = (id) => {
  router.push('/home/detail/' + id)
}

// 排行榜
const rank = () => {
  router.push('/home/rank')
}

// 上传文章
const upload = () => {
  router.push('/home/upload')
}

// 监听currentPage变化，获取数据
watch(currentPage, () => {
  fetchData()
})

// 计算总页数
const pages = computed(() => {
  const pagesArray = []
  for (let i = 1; i <= Math.ceil(items.value.length / size); i++) {
    pagesArray.push(i)
  }
  return pagesArray
})

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(items.value.length / size)
})

// 分页
const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * size
  return items.value.slice(startIndex, startIndex + size)
})

// 上一页
const prevPage = () => {
  currentPage.value--
  // 获取数据
  fetchData()
}

// 下一页
const nextPage = () => {
  currentPage.value++
  // 获取数据
  fetchData()
}
</script>

<style scoped>
html, body {
  width: 100%;
  height: 100%;
}

body {
  font: 1.2em/1.4 'Oswald', sans-serif;
  color: #fff;
  text-align: right;
}

.rolldown-list {
  text-align: left;
  padding: 0;
  margin: 0;
}

.rolldown-list li {
  padding: 1em;
  margin-bottom: .125em;
  display: block;
  list-style: none;
  text-transform: uppercase;
}

.rolldown-list li {
  visibility: hidden;
  animation: rolldown .7s 1;
  transform-origin: 50% 0;
  animation-fill-mode: forwards;
}

.rolldown-list li:nth-child(2n) {
  background-color: #7bc5ae;
}

.rolldown-list li:nth-child(2n+1) {
  background-color: #d1f8cd;
}

.title {
  font-weight: bold;
  margin-bottom: 8px;
}

.content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#myList {
  position: absolute;
  width: 50%;
  left: 50%;
  margin-left: -25%;
}

@keyframes rolldown {
  0% {
    visibility: visible;
    transform: rotateX(180deg) perspective(500px);
  }
  70% {
    visibility: visible;
    transform: rotateX(-20deg);
  }
  100% {
    visibility: visible;
    transform: rotateX(0deg);
  }
}

.main-title {
  font-size: 48px;
  font-weight: 600;
  color: #fff;
  text-shadow: 2px 2px #7bc5ae;
}

.rank {
  background-color: #fff;
  color: #7bc5ae;
  border-radius: 5px;
  border: 1px solid #7bc5ae;
  padding: 5px 10px;
  margin: 0 5px;
}

.upload {
  background-color: #fff;
  color: #7bc5ae;
  border-radius: 5px;
  border: 1px solid #7bc5ae;
  padding: 5px 10px;
  margin: 0 5px;
}

.pagination {
  display: flex;
  justify-content: left;
  margin-top: 20px;
}

.pagination button {
  background-color: #fff;
  color: #7bc5ae;
  border-radius: 5px;
  border: 1px solid #7bc5ae;
  padding: 5px 10px;
  margin: 0 5px;
}

.pagination button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.pagination button.active {
  background-color: #7bc5ae;
  color: #fff;
}
</style>