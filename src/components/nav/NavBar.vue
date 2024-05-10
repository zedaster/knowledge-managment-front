<script lang="ts">

import SiteButton from "@/components/SiteButton.vue";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import SearchInput from "@/components/nav/SearchInput.vue";
import {defineComponent} from "vue";
import AssuranceModal from "@/components/modal/AssuranceModal.vue";
import {AuthApi} from "@/api/AuthApi";
import {useUserStore} from "@/store/UserStore";
import LogoutIcon from "@/components/icons/LogoutIcon.vue";

export default defineComponent({
  components: {LogoutIcon, AssuranceModal, SearchInput, SiteButton, ProfileIcon},

  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    editButtonActive: {
      type: Boolean,
      default: true
    },
    authMode: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      exitModalShowing: false,
      userStorage: useUserStore(),
    }
  },

  emits: ['save'],

  computed: {
    showSearch() {
      return !this.editMode
    },
    showProfileOptions() {
      return !this.editMode && !this.authMode
    },
    showAddOptions() {
      return this.editMode
    },
    username() {
      return this.userStorage.user?.name
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
    save() {
      this.$emit('save');
    },
    leaveProfile() {
      this.exitModalShowing = true;
    },
    sureLeaveProfile() {
      new AuthApi().logout();
      this.$router.push({name: 'login'})
    },
    openProfile() {
      this.$router.push({'name': 'profile'})
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

          <RouterLink v-if="!authMode" :to="{name: 'home'}" class="navbar-brand" href="/">
            <img src="../../assets/image/logo.svg" width="24" height="24" class="d-inline-block align-top"
                 alt="Логотип Брусники">
            <span class="navbar-title">База знаний</span>
          </RouterLink>

          <div class="navbar-brand" v-if="authMode">
            <img src="../../assets/image/logo.svg" width="24" height="24" class="d-inline-block align-top"
                 alt="Логотип Брусники">
            <span class="navbar-title">База знаний</span>
          </div>
        </div>

        <!-- Search -->
        <!--        <div v-if="showSearch" class="col col-6">-->
        <!--          <SearchInput class="w-100"/>-->
        <!--        </div>-->

        <!-- Auth Button and Profile Icon -->
        <div v-if="showProfileOptions" class="col col-auto">
          <div class="d-flex align-items-center">
            <!--            <SiteButton><span class="mx-3">Вход</span></SiteButton>-->

            <a href="#" class="me-1 open-profile" @click="openProfile">
              <ProfileIcon class="open-profile-icon"/>
              <span class="ms-1">{{ this.username }}</span>
            </a>

            <button href="#" class="btn btn-sm btn-outline-light ms-2" @click="leaveProfile">
              <LogoutIcon class="leave-profile-icon"/>
            </button>

          </div>
        </div>

        <!-- Save or cancel buttons for article editing -->
        <div v-if="showAddOptions" class="col col-auto">
          <div class="d-flex gap-2">
            <SiteButton @click="goBack" :disabled="!this.editButtonActive">
              <span>Отменить</span>
            </SiteButton>
            <SiteButton @click="save" :disabled="!this.editButtonActive">
              <span>Сохранить</span>
            </SiteButton>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Assurance Modal for log out -->
  <AssuranceModal title="Выход"
                  cancel-label="Отмена"
                  sure-label="Выйти"
                  @assure="sureLeaveProfile"
                  v-model:showing="exitModalShowing">
    <p>Вы действительно хотите выйти из системы?</p>
  </AssuranceModal>
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

.open-profile {
  color: white;
  text-decoration: none;
}

.open-profile:hover {
  color: #ccc;
}

.leave-profile-icon {
  width: 22px;
  height: 22px;
}
</style>