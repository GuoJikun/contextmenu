<template>
  <div class="yak-content-menu" ref="wrapEl">
    <slot></slot>
    <transition>
      <div
        v-show="visible"
        class="yak-content-menu-wrap"
        :class="props.menuWrapClass"
        :style="{ left: menuPosition.left, top: menuPosition.top }"
      >
        <slot name="menu" :menuList="props.options">
          <ContentMenuItem
            :class="props.menuItemClass"
            v-for="item in props.options"
            :divider="item.divider"
            :key="item.command"
            @click="menuClick(item)"
          >
            {{ item.text }}
          </ContentMenuItem>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount, PropType } from "vue";
import ContentMenuItem from "./content-menu-item.vue";

export interface MenuItem {
  text?: string;
  command?: string;
  disabled?: boolean;
  divider?: boolean;
  submenu?: MenuItem[];
}

const props = defineProps({
  options: {
    type: Array as PropType<MenuItem[]>,
    default: () => {
      return [];
    },
  },
  menuWrapClass: String,
  menuItemClass: String,
});

const emit = defineEmits(["menu-click"]);

const wrapEl = ref<HTMLElement | null>(null);
const visible = ref(false);

const menuPosition: any = reactive({
  left: 0,
  top: 0,
});

const showContentMenuFn = (ev: any) => {
  ev.preventDefault();
  const rootPosition = (wrapEl.value as HTMLElement).getBoundingClientRect();
  const x = ev.x - rootPosition.left;
  const y = ev.y - rootPosition.top;
  menuPosition.top = `${y}px`;
  menuPosition.left = `${x}px`;
  visible.value = true;
};

const hideContentFn = () => {
  visible.value = false;
};

const menuClick = (item: MenuItem) => {
  emit("menu-click", item);
};

onMounted(() => {
  (wrapEl.value as HTMLElement).addEventListener(
    "contextmenu",
    showContentMenuFn
  );
  (wrapEl.value as HTMLElement).addEventListener("click", hideContentFn);
});

onBeforeUnmount(() => {
  (wrapEl.value as HTMLElement).removeEventListener(
    "contextmenu",
    showContentMenuFn
  );
  (wrapEl.value as HTMLElement).removeEventListener("click", hideContentFn);
});

defineExpose(showContentMenuFn);
</script>

<style lang="scss">
.yak-content-menu {
  position: relative;
  &-wrap {
    display: inline-block;
    box-sizing: border-box;
    background-color: #fff;
    position: absolute;
    box-shadow: 0 1px 6px rgb(0 0 0 / 20%), 0 -1px 6px rgb(0 0 0 / 20%);
    border-color: 1px solid #eee;
    border-radius: 4px;
    padding: 5px 0;
    min-width: 160px;
    z-index: 10;
  }
}
</style>
