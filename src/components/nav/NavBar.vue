<script lang="ts">

import SiteButton from "@/components/SiteButton.vue";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import SearchInput from "@/components/nav/SearchInput.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {SearchInput, SiteButton, ProfileIcon},
  data() {
    return {
      showSearch: true,
      showProfileOptions: true,
      showAddOptions: false,
    }
  },
  watch: {
    // Use the `$route` special key to react to route changes
    '$route'(to) {
      if (to.name === 'add_article') {
        this.showSearch = false;
        this.showProfileOptions = false;
        this.showAddOptions = true;
        return
      }
      this.showSearch = true;
      this.showProfileOptions = true;
      this.showAddOptions = false;
    },
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    createArticle() {
      // TODO
    }
  }
})
</script>

<template>
  <nav class="navbar navbar-dark bg-black">
    <div class="container">
      <div class="row w-100 justify-content-between">
        <!-- Logo -->
        <div class="col col-auto">
          <RouterLink :to="{name: 'home'}" class="navbar-brand" href="/">
            <img src="../../assets/image/logo.svg" width="24" height="24" class="d-inline-block align-top"
                 alt="Логотип Брусники">
            <span class="navbar-title">База знаний</span>
          </RouterLink>
        </div>

        <!-- Search -->
        <div v-if="showSearch" class="col col-6">
          <SearchInput class="w-100"/>
        </div>

        <!-- Auth Button and Profile Icon -->
        <div v-if="showProfileOptions" class="col col-auto">
          <div class="d-flex">
            <SiteButton><span class="mx-3">Вход</span></SiteButton>
            <a href="#" class="ms-4">
              <ProfileIcon/>
            </a>
          </div>
        </div>

        <!-- Save or cancel buttons for article editing -->
        <div v-if="showAddOptions" class="col col-auto">
          <div class="d-flex gap-2">
            <SiteButton @click="goBack"><span>Отменить</span></SiteButton>
            <SiteButton @click="createArticle"><span>Сохранить</span></SiteButton>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-title {
  margin-left: 10px;
}

.col {
  display: flex;
  align-items: center;
}

</style>