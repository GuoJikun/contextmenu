<template>
  <div class="yak-content-menu" ref="wrapEl">
    <slot></slot>
    <transition>
      <div
        v-show="visiable"
        class="yak-content-menu-wrap"
        :class="menuWrapClass"
        :style="{ left: menuPosition.left, top: menuPosition.top }"
      >
        <slot name="menu" :menuList="menus">
          <span
            class="yak-content-menu-wrap-item"
            :class="menuItemClass"
            v-for="item in menus"
            :key="item.command"
            @click="menuClick(item)"
          >
            {{ item.text }}
          </span>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  PropType,
  toRef,
} from "vue";

interface MenuItem {
  command: string;
  text: string;
}

type Menus = Array<MenuItem>;

export default defineComponent({
  name: "YakContextmenu",
  props: {
    menus: {
      type: Array as PropType<Menus>,
      default: () => {
        return [];
      },
      required: true,
    },
    menuWrapClass: String,
    menuItemClass: String,
  },
  emits: ["menu-click"],
  setup(props, { emit }) {
    const wrapEl = ref();
    const visiable = ref(false);

    console.log(props);

    // const menusList = toRef(props, "menus");

    const menuPosition: any = reactive({
      left: 0,
      top: 0,
    });

    const showContentMenuFn = (ev: any) => {
      ev.preventDefault();
      const rootPosition = wrapEl.value.getBoundingClientRect();
      const x = ev.x - rootPosition.left;
      const y = ev.y - rootPosition.top;
      menuPosition.top = `${y}px`;
      menuPosition.left = `${x}px`;
      visiable.value = true;
    };

    const hideContentFn = () => {
      visiable.value = false;
    };

    const menuClick = (item: MenuItem) => {
      emit("menu-click", item);
    };

    onMounted(() => {
      wrapEl.value.addEventListener("contextmenu", showContentMenuFn);
      wrapEl.value.addEventListener("click", hideContentFn);
    });

    onBeforeUnmount(() => {
      wrapEl.value.removeEventListener("contextmenu", showContentMenuFn);
      wrapEl.value.removeEventListener("click", hideContentFn);
    });

    return {
      wrapEl,
      visiable,
      menuPosition,
      menuClick,
    };
  },
});
</script>

<style lang="scss">
.yak-content-menu {
  position: relative;
  &-wrap {
    display: inline-block;
    box-sizing: border-box;
    background-color: #fff;
    position: absolute;
    box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
    border-color: 1px solid #eee;
    border-radius: 4px;
    padding: 5px 0;
    min-width: 160px;
    &-item {
      cursor: pointer;
      display: block;
      line-height: 28px;
      font-size: 14px;
      padding: 0 24px;
      text-align: left;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
