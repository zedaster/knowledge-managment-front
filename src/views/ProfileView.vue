<script lang="ts">

import {defineComponent} from "vue";
import NavBar from "@/components/nav/NavBar.vue";
import ArticleContent from "@/components/knowledge/ArticleContent.vue";
import ArticleHead from "@/components/knowledge/head/ArticleHead.vue";
import KnowledgeLayout from "@/views/KnowledgeLayout.vue";
import AssuranceModal from "@/components/modal/AssuranceModal.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import RemoveIcon from "@/components/icons/RemoveIcon.vue";
import type {UserInfo} from "@/models/user/UserInfo";
import type {ChangedValueType} from "@/models/ChangedValueType";
import ProfileField from "@/components/profile/ProfileField.vue";
import {FormatDateTimeUtil} from "@/utils/format/FormatDateTimeUtil";
import {FormatRoleUtil} from "@/utils/format/FormatRoleUtil";
import {ProfileApi} from "@/api/ProfileApi";

const profileApi = new ProfileApi();

const filedNames: ChangedValueType<UserInfo, string> = {
  id: "ID",
  lastName: "Фамилия",
  firstName: "Имя",
  patronymic: "Отчество",
  createdAt: "Дата регистрации",
  role: "Роль"
}

export default defineComponent({
  components: {
    ProfileField,
    RemoveIcon,
    EditIcon,
    LoadingSpinner,
    AssuranceModal,
    KnowledgeLayout,
    ArticleHead,
    ArticleContent,
    NavBar
  },

  data() {
    return {
      isLoading: true,
      userInfo: null as null | UserInfo,
      filedNames
    }
  },

  computed: {
    strUserInfo(): ChangedValueType<UserInfo, string> | null {
      if (!this.userInfo) {
        return null;
      }

      return {
        id: this.userInfo.id.toString(),
        lastName: this.userInfo.lastName,
        firstName: this.userInfo.firstName,
        patronymic: this.userInfo.patronymic,
        createdAt: new FormatDateTimeUtil().stringifyDate(this.userInfo.createdAt),
        role: new FormatRoleUtil().stringifyRole(this.userInfo.role)
      }
    }
  },

  created() {
    profileApi.loadUserInfo().then((info: UserInfo) => {
      this.userInfo = info;
      this.isLoading = false;
    })
  }
})
</script>

<template>
  <header>
    <NavBar/>
  </header>

  <KnowledgeLayout>
    <h1>Профиль</h1>

    <div v-if="isLoading" class="d-flex justify-content-center">
      <LoadingSpinner/>
    </div>

    <div v-else class="mt-4">
      <ProfileField v-for="(value, key) in strUserInfo" :title="filedNames[key]" :value="value"/>
    </div>
  </KnowledgeLayout>
</template>

<style scoped>

</style>