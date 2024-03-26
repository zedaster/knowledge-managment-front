<script lang="ts">

import NavBar from "@/components/nav/NavBar.vue";
import {defineComponent} from "vue";
import {AuthApi} from "@/api/AuthApi";
import {Tooltip} from "bootstrap";
import type {RegisterDto} from "@/api/dto/RegisterDto";

/**
 * Register view
 */
export default defineComponent({
  components: {NavBar},

  data() {
    return {
      api: new AuthApi(),
      registerDto: {
        login: '',
        // email: '',
        password: '',
        repeatPassword: ''
      } as RegisterDto,
      isFilled: false,
      isRegistering: false,
      tooltipText: 'Введите логин',
      alertShown: false,
      alertText: ''
    }
  },

  mounted() {
    if (this.api.isAuthorized()) {
      this.$router.push({name: 'home'});
      return;
    }
    this.updateTooltip()
  },

  beforeUnmount() {
    const wrapper = this.$refs.registerButtonWrapper;
    Tooltip.getOrCreateInstance(wrapper).dispose()
  },

  methods: {
    openLoginPage() {
      this.$router.push({name: 'login'})
    },

    register() {
      this.isRegistering = true;
      this.api.register(this.registerDto).then(() => {
        this.isRegistering = false;
        this.openLoginPage();
      }).catch(e => {
        this.alertText = e;
        this.alertShown = true;
        this.isRegistering = false;
      })
    },

    updateTooltip() {
      console.log('New tooltip text is ' + this.tooltipText)
      const wrapper = this.$refs.registerButtonWrapper;
      Tooltip.getOrCreateInstance(wrapper).setContent({'.tooltip-inner': this.tooltipText})
    }
  },

  watch: {
    registerDto: {
      handler(newDto) {
        // else if (newDto.email === '') {
        //     this.isFilled = false;
        //     this.tooltipText = 'Введите email'
        //   }
        if (newDto.login === '') {
          this.isFilled = false;
          this.tooltipText = 'Введите логин';
        } else if (newDto.password === '') {
          this.isFilled = false;
          this.tooltipText = 'Введите пароль'
        } else if (newDto.repeatPassword === '') {
          this.isFilled = false;
          this.tooltipText = 'Повторите пароль'
        } else if (newDto.password !== newDto.repeatPassword) {
          this.isFilled = false;
          this.tooltipText = 'Пароли не совпадают'
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
    <NavBar :auth-mode="true"/>
  </header>
  <main class="container h-100">
    <div class="row justify-content-center align-items-center">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-12">
        <h1 class="mt-4 mb-4">Регистрация</h1>

        <div class="alert alert-danger" role="alert" v-if="alertShown">
          {{ this.alertText }}
        </div>

        <!-- Login input -->
        <div class="mb-3">
          <label for="loginInput" class="form-label">Логин</label>
          <input type="text"
                 class="form-control"
                 id="loginInput"
                 v-model="registerDto.login"
                 placeholder="Логин">
        </div>

        <!-- Email input -->
        <!--        <div class="mb-3">-->
        <!--          <label for="emailInput" class="form-label">Email</label>-->
        <!--          <input type="email"-->
        <!--                 class="form-control"-->
        <!--                 id="emailInput"-->
        <!--                 v-model="registerDto.email"-->
        <!--                 placeholder="home@brusnika.com">-->
        <!--        </div>-->

        <!-- Password input -->
        <div class="mb-4">
          <label for="passwordInput" class="form-label">Пароль</label>
          <input type="password"
                 class="form-control"
                 id="passwordInput"
                 v-model="registerDto.password"
                 placeholder="xxxxxxxxx">
        </div>

        <!-- Password repeat input -->
        <div class="mb-4">
          <label for="passwordRepeatInput" class="form-label">Повторите пароль</label>
          <input type="password"
                 class="form-control"
                 id="passwordRepeatInput"
                 v-model="registerDto.repeatPassword"
                 placeholder="xxxxxxxxx">
        </div>

        <span class="d-inline-block w-100"
              ref="registerButtonWrapper"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="default"
        >
          <button type="button"
                  class="btn btn-dark btn-login mb-3"
                  @click="register"
                  :disabled="!isFilled || isRegistering">
          <span>Зарегистрироваться</span>
        </button>
        </span>


        <button type="button"
                class="btn btn-outline-dark btn-reg-now mb-4"
                @click="openLoginPage">
          <span class="text-muted me-1">Уже зарегистрированы?</span>
          <span>Войти</span>
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