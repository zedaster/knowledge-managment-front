<script setup lang="ts"></script>

<template>
  <button type="button" class="btn py-1 px-3">
    <slot/>
  </button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 32px;
  border: 3px solid var(--accent);

  font-family: Grtsk Exa, Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  background-color: var(--accent);
  color: white;
}
button:hover {
  color: var(--accent);
  border: 3px solid var(--accent);
}
</style>