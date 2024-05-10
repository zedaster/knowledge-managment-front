<script setup lang="ts">

</script>

<template>
  <table class="table table-bordered w-100">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Фамилия</th>
      <th scope="col">Имя</th>
      <th scope="col">Отчество</th>
      <th scope="col">Дата регистрации</th>
      <th scope="col">Роль</th>
    </tr>
    </thead>
    <tbody>
    <slot/>
    </tbody>
  </table>

</template>

<style scoped>
table {
  text-align: center;
}
</style>