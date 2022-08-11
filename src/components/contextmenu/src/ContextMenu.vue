<template>
  <teleport
    :disabled="!props.appendToBody"
    :to="props.appendToBody ? 'body' : null"
  >
    <transition name="modal">
      <div
        class="yak-content-menu"
        ref="wrapEl"
        v-show="visible"
        :class="props.menuWrapClass"
        :style="{
          left: menuPosition.left,
          top: menuPosition.top,
          width: `${Number(width)}px`,
        }"
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
  </teleport>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  PropType,
  nextTick,
  h,
} from "vue";
import ContentMenuItem from "./content-menu-item.vue";
import { type } from "./utils";
import type { Menus, MenuItem } from "./typescript";

const props = defineProps({
  options: {
    type: Array as PropType<Menus>,
    default: () => {
      return [];
    },
  },
  menuWrapClass: String,
  menuItemClass: String,
  appendToBody: Boolean,
  width: {
    type: [Number, String],
    default: 200,
  },
  container: {
    type: [Object, String] as PropType<HTMLElement | String>,
    default: () => {
      return document.body;
    },
  },
});

const emit = defineEmits(["menu-click"]);

const wrapEl = ref<null | HTMLElement>(null);
const visible = ref(false);

const menuPosition: any = reactive({
  left: 0,
  top: 0,
});

const showContentMenuFn = (ev: MouseEvent) => {
  ev.preventDefault();
  visible.value = true;
  nextTick(() => {
    const menuStyle = getComputedStyle(wrapEl.value as HTMLElement);
    const rootW = menuStyle.width;
    const rootH = menuStyle.height;

    if (ev.x + parseFloat(rootW) > window.innerWidth) {
      menuPosition.left = `${ev.x - parseFloat(rootW)}px`;
    } else {
      menuPosition.left = `${ev.x}px`;
    }
    if (ev.y + parseFloat(rootH) > window.innerHeight) {
      menuPosition.top = `${ev.y - parseFloat(rootH)}px`;
    } else {
      menuPosition.top = `${ev.y}px`;
    }
  });
};

const hideContentFn = () => {
  visible.value = false;
};

const menuClick = (item: MenuItem) => {
  emit("menu-click", item);
};

onMounted(() => {
  window.addEventListener("click", hideContentFn);
  if (type(props.container) === "String") {
    const el = document.querySelector(props.container as string) as HTMLElement;
    el?.addEventListener("click", hideContentFn, true);
    el?.addEventListener("contextmenu", showContentMenuFn);
  } else {
    (props.container as HTMLElement).addEventListener(
      "click",
      hideContentFn,
      true
    );
    (props.container as HTMLElement).addEventListener(
      "contextmenu",
      showContentMenuFn
    );
  }
});

onBeforeUnmount(() => {
  if (type(props.container) === "String") {
    const el = document.querySelector(props.container as string) as HTMLElement;
    el?.removeEventListener("contextmenu", showContentMenuFn);
  } else {
    (props.container as HTMLElement).removeEventListener(
      "contextmenu",
      showContentMenuFn
    );
  }
  window.removeEventListener("click", hideContentFn);
});
</script>

<style lang="scss">
.yak-content-menu {
  position: fixed;
  display: inline-block;
  box-sizing: border-box;
  background-color: #fff;
  position: absolute;
  box-shadow: 0 0px 10px 4px rgb(0 0 0 / 12%);
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 5px 0;
  min-width: 160px;
  z-index: 10;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
