<script lang="ts">

import NavBar from "@/components/nav/NavBar.vue";
import {defineComponent} from "vue";
import {AuthApi} from "@/api/AuthApi";
import type {LoginDto} from "@/api/dto/LoginDto";
import {Tooltip} from "bootstrap";

export default defineComponent({
  components: {NavBar},

  data() {
    return {
      api: new AuthApi(),
      loginDto: {
        username: '',
        password: ''
      } as LoginDto,
      isFilled: false,
      isLoggingIn: false,
      tooltipText: 'Введите логин',
    }
  },

  mounted() {
    this.updateTooltip()
  },

  methods: {
    openRegisterPage() {
      this.$router.push({name: 'register'})
    },
    login() {
      this.isLoggingIn = true;
      this.api.login(this.loginDto).then(() => {
        this.isLoggingIn = false;
        this.$router.push({name: 'home'})
      })
    },

    updateTooltip() {
      console.log('New tooltip text is ' + this.tooltipText)
      const wrapper = this.$refs.loginButtonWrapper;
      Tooltip.getOrCreateInstance(wrapper).setContent({'.tooltip-inner': this.tooltipText})
    }
  },

  watch: {
    loginDto: {
      handler(newDto) {
        if (newDto.login === '') {
          this.isFilled = false;
          this.tooltipText = 'Введите логин';
        } else if (newDto.password === '') {
          this.isFilled = false;
          this.tooltipText = 'Введите пароль'
        } else {
          this.tooltipText = 'Все отлично'
          this.isFilled = true;
        }
        this.updateTooltip();
      },
      deep: true
    }
  }
});
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <main class="container h-100">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-12">
        <h1 class="mt-4 mb-4">Вход в личный кабинет</h1>
        <div class="mb-3">
          <label for="emailInput" class="form-label">Email</label>
          <input type="email"
                 class="form-control"
                 id="emailInput"
                 v-model="loginDto.username"
                 placeholder="home@brusnika.com">
        </div>
        <div class="mb-4">
          <label for="passwordInput" class="form-label">Пароль</label>
          <input type="password"
                 class="form-control"
                 id="passwordInput"
                 v-model="loginDto.password"
                 placeholder="xxxxxxxxx">
        </div>
        <span class="d-inline-block w-100"
              ref="loginButtonWrapper"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="default">
          <button type="button"
                  class="btn btn-dark btn-login mb-3"
                  :disabled="isLoggingIn || !isFilled"
                  @click="login">
            <span>Войти</span>
          </button>
        </span>
        <button type="button"
                class="btn btn-outline-dark btn-reg-now mb-4"
                @click="openRegisterPage">
          <span class="text-muted me-1">Еще не зарегистрированы?</span>
          <span>Регистрация</span>
        </button>
      </div>

    </div>
  </main>
</template>

<style scoped>
.form-control {
  border-radius: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.btn-login {
  width: 100%;
  border-radius: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.btn-reg-now {
  width: 100%;
  border-radius: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
</style>