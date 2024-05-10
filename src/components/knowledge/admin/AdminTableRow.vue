<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import type {PanelUser} from "@/models/user/PanelUser";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {FormatDateTimeUtil} from "@/utils/format/FormatDateTimeUtil";
import {FormatRoleUtil} from "@/utils/format/FormatRoleUtil";

const dateUtil = new FormatDateTimeUtil();
const roleUtil = new FormatRoleUtil();

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
    return {
      roleUtil
    }
  },

  computed: {
    strRegDate() {
      const regDate = this.user.regDate
      return dateUtil.stringifyDate(regDate)
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
          <option v-for="(roleKey, roleName) in roleUtil.getRoleNames()" :value="roleName">
            {{ roleKey }}
          </option>
        </select>
      </div>
    </td>
  </tr>
</template>

<style scoped>

</style>