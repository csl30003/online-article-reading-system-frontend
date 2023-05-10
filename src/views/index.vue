<template>
  <section class="user">
    <div class="user_options-container">
      <div class="user_options-text">
        <div class="user_options-unregistered">
          <h2 class="user_unregistered-title">没有账号？</h2>
          <p class="user_unregistered-text">注册一个账号，享受阅读的快乐！</p>
          <button @click="bounceLeft" class="user_unregistered-signup" id="signup-button">注册</button>
        </div>

        <div class="user_options-registered">
          <h2 class="user_registered-title">拥有账户？</h2>
          <p class="user_registered-text">欢迎来到知识的海洋！</p>
          <button @click="bounceRight" class="user_registered-login" id="login-button">登录</button>
        </div>
      </div>

      <div :class="formClass" class="user_options-forms" id="user_options-forms">
        <div class="user_forms-login">
          <h2 class="forms_title">登录</h2>
          <form class="forms_form">
            <fieldset class="forms_fieldset">
              <div class="forms_field">
                <input v-model="username" type="text" placeholder="用户名" class="forms_field-input" required
                       autofocus/>
              </div>
              <div class="forms_field">
                <input v-model="password" type="password" placeholder="密码" class="forms_field-input" required/>
              </div>
            </fieldset>
            <div class="forms_buttons">
              <button type="button" class="forms_buttons-forgot">忘记密码？</button>
              <input @click="login" type="button" value="确定" class="forms_buttons-action">
            </div>
          </form>
        </div>
        <div class="user_forms-signup">
          <h2 class="forms_title">注册</h2>
          <form class="forms_form">
            <fieldset class="forms_fieldset">
              <div class="forms_field">
                <input v-model="username" type="text" placeholder="用户名" class="forms_field-input" required/>
              </div>
              <div class="forms_field">
                <input v-model="nickname" type="text" placeholder="昵称" class="forms_field-input" required/>
              </div>
              <div class="forms_field">
                <input v-model="password" type="password" placeholder="密码" class="forms_field-input" required/>
              </div>
            </fieldset>
            <div class="forms_buttons">
              <input @click="register" type="button" value="确定" class="forms_buttons-action">
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref} from "vue";
import instance from "@/axios"
import {useRouter} from "vue-router"

const formClass = ref()
// 移动框
const bounceLeft = () => {
  formClass.value = "bounceLeft"
}
const bounceRight = () => {
  formClass.value = "bounceRight"
}

// 路由
const router = useRouter()

// 登录信息
const username = ref("")
const password = ref("")
// 登录
const login = async () => {
  instance
      .post('http://127.0.0.1:8080/api/user/login', {
        username: username.value,
        password: password.value
      })
      .then(res => {
        if (res.data.code === 1) {
          localStorage.setItem("token", res.data.data)
          router.push("/home")
        } else {
          alert(res.data.msg)
        }
      })
      .catch(err => {
        alert(err)
      })
}

// 注册比登录多一个nickname
const nickname = ref("")
// 注册
const register = async () => {
  instance
      .post("http://127.0.0.1:8080/api/user/register", {
        username: username.value,
        password: password.value,
        nickname: nickname.value,
      })
      .then((res) => {
        if (res.data.code === 1) {
          alert("注册成功");
          bounceRight();
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert(err);
      });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/**
 * General variables
 */
/**
 * General configs
 */
* {
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}

input[type="submit"] {
  cursor: pointer;
}

input::placeholder {
  font-size: .85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: .1rem;
  color: #ccc;
}

/**
 * Bounce to the left side
 */
@keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}

/**
 * Bounce to the left side
 */
@keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}

/**
 * Show Sign Up form
 */
@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}

/**
 * Page background
 */
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #7bc5ae;
  background-size: cover;
}

.user_options-container {
  position: relative;
  width: 80%;
}

.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.85);
  border-radius: 3px;
}

/**
 * Registered and Unregistered user box and text
 */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.66rem;
  line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
  font-size: .83rem;
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: .2rem;
  transition: background-color .2s ease-in-out, color .2s ease-in-out;
}

.user_registered-login:hover,
.user_unregistered-signup:hover {
  color: rgba(34, 34, 34, 0.85);
  background-color: #ccc;
}

/**
 * Login and signup forms
 */
.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 450px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform: translate3d(100%, -50%, 0);
  transition: transform .4s ease-in-out;
}

.user_options-forms .user_forms-login {
  transition: opacity .4s ease-in-out, visibility .4s ease-in-out;
}

.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1em;
  text-transform: uppercase;
  color: #7bc5ae;
  letter-spacing: .1rem;
}

.user_options-forms .forms_field:not(:last-of-type) {
  margin-bottom: 20px;
}

.user_options-forms .forms_field-input {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 6px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: gray;
  letter-spacing: .1rem;
  transition: border-color .2s ease-in-out;
}

.user_options-forms .forms_field-input:focus {
  border-color: gray;
}

.user_options-forms .forms_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
}

.user_options-forms .forms_buttons-forgot {
  font-family: "Montserrat", sans-serif;
  letter-spacing: .1rem;
  color: #ccc;
  text-decoration: underline;
  transition: color .2s ease-in-out;
}

.user_options-forms .forms_buttons-forgot:hover {
  color: #b3b3b3;
}

.user_options-forms .forms_buttons-action {
  background-color: #7bc5ae;
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: .1rem;
  transition: background-color .2s ease-in-out;
}

.user_options-forms .forms_buttons-action:hover {
  background-color: #7bc5ae;
}

.user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
  position: absolute;
  top: 70px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  transition: opacity .4s ease-in-out, visibility .4s ease-in-out, transform .5s ease-in-out;
}

.user_options-forms .user_forms-signup {
  transform: translate3d(120px, 0, 0);
}

.user_options-forms .user_forms-signup .forms_buttons {
  justify-content: flex-end;
}

.user_options-forms .user_forms-login {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

/**
 * Triggers
 */
.user_options-forms.bounceLeft {
  animation: bounceLeft 1s forwards;
}

.user_options-forms.bounceLeft .user_forms-signup {
  animation: showSignUp 1s forwards;
}

.user_options-forms.bounceLeft .user_forms-login {
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-120px, 0, 0);
}

.user_options-forms.bounceRight {
  animation: bounceRight 1s forwards;
}

/**
 * Responsive 990px
 */
@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 350px;
  }

  .user_options-forms .forms_buttons {
    flex-direction: column;
  }

  .user_options-forms .user_forms-login .forms_buttons-action {
    margin-top: 30px;
  }

  .user_options-forms .user_forms-signup,
  .user_options-forms .user_forms-login {
    top: 40px;
  }

  .user_options-registered,
  .user_options-unregistered {
    padding: 50px 45px;
  }
}

</style>
