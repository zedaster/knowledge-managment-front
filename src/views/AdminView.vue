<script lang="ts">
import {defineComponent, ref, toRaw} from "vue";
import NavBar from "@/components/nav/NavBar.vue";
import KnowledgeLayout from "@/views/KnowledgeLayout.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import type {PanelUser} from "@/models/user/PanelUser";
import {AdminPanelApi} from "@/api/AdminPanelApi";
import AdminTable from "@/components/knowledge/admin/AdminTable.vue";
import SiteButton from "@/components/SiteButton.vue";
import AdminTableRow from "@/components/knowledge/admin/AdminTableRow.vue";
import KnowledgeContainer from "@/components/knowledge/KnowledgeContainer.vue";

const panelApi = new AdminPanelApi()

/**
 * Administrator page to manage users' group
 */
export default defineComponent({
  components: {KnowledgeContainer, AdminTableRow, SiteButton, AdminTable, LoadingSpinner, KnowledgeLayout, NavBar},

  data: () => ({
    isLoading: true,

    isSaving: false,

    /**
     * Users that is shown as rows in the admin table
     */
    users: null as PanelUser[] | null,

    /**
     * Variable to save changed users
     */
    changedUsers: [] as PanelUser[],

    /**
     * Initial state of users that was changed
     */
    initialUsers: null as PanelUser[] | null,
  }),

  setup() {
    const saveToast = ref();
    return {saveToast}
  },

  mounted() {
    panelApi.getUsers().then((users) => {
      this.users = users;
      this.initialUsers = structuredClone(users);
      this.isLoading = false;
    })
  },

  computed: {
    areButtonsDisabled() {
      return this.changedUsers.length === 0 || this.isSaving;
    },
    areRowsDisabled() {
      return this.isSaving
    }
  },

  methods: {
    /**
     * Calls when some user row has updated
     * @param user
     */
    onUpdateUser(user: PanelUser) {
      const elemId = this.users?.findIndex((u) => u.id === user.id)
      const initialUser = this.initialUsers![elemId]
      this.changedUsers = this.changedUsers.filter((u) => u.id !== user.id)
      if (JSON.stringify(initialUser) === JSON.stringify(user)) {
        return;
      }
      this.changedUsers.push(user);
    },

    /**
     * Save the cached changes to the server
     */
    save() {
      this.isSaving = true;
      const savingUsers = structuredClone(toRaw(this.users));
      panelApi.saveMany(this.changedUsers).then(() => {
        this.changedUsers = [];
        this.initialUsers = savingUsers;
        this.isSaving = false;
      })
    },

    /**
     * Cleans and rolls back the cached changes
     */
    cancel() {
      this.changedUsers = [];
      this.isLoading = true;

      panelApi.getUsers().then((users) => {
        this.users = users;
        this.initialUsers = structuredClone(users);
        this.isLoading = false;
      })
    }
  },
})
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <KnowledgeLayout>
    <div v-if="isLoading" class="d-flex justify-content-center">
      <LoadingSpinner/>
    </div>

    <AdminTable v-else>
      <AdminTableRow v-for="user in users" :user="user" @update:user="onUpdateUser" :disabled="areRowsDisabled"/>
    </AdminTable>

    <div class="d-flex gap-1 justify-content-end">
      <SiteButton @click="this.save" :disabled="areButtonsDisabled">Сохранить</SiteButton>
      <SiteButton @click="this.cancel" :disabled="areButtonsDisabled">Отменить</SiteButton>
    </div>
  </KnowledgeLayout>
</template>

<style scoped>

</style>