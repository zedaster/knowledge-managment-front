<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import type {PanelUser, Role} from "@/models/user/PanelUser";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default defineComponent({
  components: {LoadingSpinner},

  props: {
    user: {
      type: Object as PropType<PanelUser>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const roles: Record<Role, string> = {
      admin: "Администратор",
      writer: "Редактор",
      reader: "Читатель"
    };

    return {
      roles
    }
  },

  computed: {
    strRegDate() {
      const regDate = this.user.regDate

      const day = String(regDate.getDate()).padStart(2, '0');
      const month = String(regDate.getMonth() + 1).padStart(2, '0'); // January is 0!
      const year = regDate.getFullYear();

      return `${day}.${month}.${year}`;
    }
  },

  methods: {
    onChange() {
      this.$emit("update:user", this.user)
    }
  },

  emits: ['update:user']
})
</script>

<template>
  <tr>
    <th scope="row">{{ user.id }}</th>
    <td>{{ user.lastName }}</td>
    <td>{{ user.firstName }}</td>
    <td>{{ user.patronymic }}</td>
    <td>{{ this.strRegDate }}</td>
    <td>
      <div class="d-flex justify-content-center">
        <select class="form-select w-auto" v-model="user.role" @change="onChange" :disabled="disabled">
          <option v-for="roleArray in Object.entries(roles)" :value="roleArray[0]">
            {{ roleArray[1] }}
          </option>
        </select>
      </div>
    </td>
  </tr>
</template>

<style scoped>

</style>