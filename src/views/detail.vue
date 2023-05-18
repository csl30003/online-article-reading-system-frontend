<template>
  <div class="container">
    <h1 class="title">文章详情</h1>
    <div class="card">
      <h2 class="card-title">{{ article.title }}</h2>
      <div class="card-author">{{ article.nickname }}</div>
      <div class="card-time">{{ article.createTime }}</div>
      <div class="card-content">{{ article.content }}</div>
      <div class="card-action">
        <div>
          <button class="comment-like" @click="likeArticle">点赞</button>
          <button class="comment-like" @click="cancelLike">取消点赞</button>
        </div>
      </div>
    </div>

    <div class="comments">
      <h2 class="comments-title">评论</h2>
      <div class="comments-list">
        <ul>
          <li v-for="(comment, index) in comments" :key="index" class="comment-item">
            <div class="comment-info">
              <span class="comment-author">{{ comment.nickname }}</span>
              <span class="comment-time">{{ comment.createTime }}</span>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="comment-box">
      <h2 class="comment-box-title">发表评论</h2>
      <form class="comment-form" @submit.prevent="submitComment">
        <textarea class="comment-textarea" v-model="commentContent" placeholder="请输入评论内容"></textarea>
        <button class="comment-submit" type="submit">提交评论</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router"
import instance from "@/axios";
import {inject, onMounted, ref, reactive} from "vue";

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

let comments = ref([])

let commentContent = ref('')

onMounted(() => {
  fetchData()
  getComments()
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

const getComments = async () => {
  if (!checkToken()) {
    // token过期了或者没有token，跳转登录页面
    await router.push("/")
  } else {
    token = localStorage.getItem('token')
    instance
        .get('http://127.0.0.1:8080/api/article/' + id + "/comment",
            {
              headers: {
                'Authorization': token
              }
            })
        .then(res => {
          if (res.data.code === 1) {
            // 成功获取文章的详细信息
            comments.value = res.data.data
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

const cancelLike = () => {
  if (!checkToken()) {
    // token过期了或者没有token，跳转登录页面
    router.push("/")
  } else {
    console.log(token)
    instance
        .post('http://127.0.0.1:8080/api/article/' + id + "/cancelLike",
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

const submitComment = () => {
  if (!checkToken()) {
    // token过期了或者没有token，跳转登录页面
    router.push("/")
  } else {
    console.log(token)
    instance
        .post('http://127.0.0.1:8080/api/article/' + id + "/commentUpload",
            {
              content: commentContent.value
            },
            {
              headers: {
                'Authorization': token
              }
            })
        .then(res => {
              if (res.data.code === 1) {
                getComments()
                commentContent.value = ""
              } else {
                alert(res.data.message)
              }
            }
        )
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  color: #333;
  margin-top: 50px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #28a745;
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 80%;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #28a745;
}

.card-author {
  font-size: 16px;
  color: #888;
  margin-bottom: 10px;
}

.card-time {
  font-size: 16px;
  color: #888;
  margin-bottom: 10px;
}

.card-content {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
  color: #333;
}

.card-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-likes {
  display: flex;
  align-items: center;
}

.icon-like {
  margin-right: 5px;
  font-size: 20px;
  cursor: pointer;
  color: #28a745;
}

.icon-like.active {
  color: green;
}

.comments {
  width: 80%;
}

.comments-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #28a745;
}

.comments-list {
  border: none;
  border-radius: 20px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
}

.comment-item {
  margin-bottom: 10px;
}

.comment-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.comment-author {
  font-size: 16px;
  color: #888;
}

.comment-time {
  font-size: 12px;
  color: #888;
}

.comment-content {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.comment-box {
  width: 80%;
  margin-bottom: 20px;
}

.comment-box-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #28a745;
}

.comment-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comment-textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  padding: 12px;
  border: 2px solid #28a745;
  border-radius: 20px;
  font-size: 16px;
  color: #28a745;
}

.comment-submit {
  padding: 8px 24px;
  background-color: #28a745;
  border-radius: 20px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.comment-submit:hover {
  background-color: #fff;
  color: #28a745;
  border: 2px solid #28a745;
}

.comment-like {
  padding: 8px 16px;
  background-color: #28a745;
  border-radius: 20px;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.comment-like:hover {
  background-color: #fff;
  color: #28a745;
  border: 2px solid #28a745;
}

</style>