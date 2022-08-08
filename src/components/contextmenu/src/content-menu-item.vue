<template>
  <div class="jk-context-menu-item" :class="{ 'is-divider': divider }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  divider: Boolean,
});
</script>

<style lang="scss">
.jk-context-menu-item {
  line-height: 28px;
  font-size: 14px;
  padding: 0 24px;
  text-align: left;
  border-radius: 2px;
  transition: background-color 0.2s ease-in-out;
  cursor: default;
  &:hover {
    background-color: #f1f1f1;
  }
}
.is-divider {
  background-color: #e1e3ef;
  height: 1px;
  margin: 5px 0;
}
</style>
