import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  PropType,
  nextTick,
  defineComponent,
  provide,
} from "vue";
import { type } from "./utils";

import Wrap from "./wrap";
import Contextmenu from "./contextmenu";

import type { ContextmenuItem } from "./typescript";

export type Menus = ContextmenuItem[];

export default defineComponent({
  props: {
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
    submenuTrigger: {
      type: String,
      default: "hover",
      validator(val: string) {
        return ["click", "hover"].includes(val);
      },
    },
  },
  emits: ["menu-click"],
  setup(props, { slots }) {
    const wrapEl = ref<null | HTMLElement>(null);
    const menuEl = ref<null | InstanceType<typeof Contextmenu>>(null);

    provide("rootEl", wrapEl);
    const visible = ref(false);

    const menuPosition: any = reactive({
      left: 0,
      top: 0,
    });

    const showContentMenuFn = (ev: MouseEvent) => {
      ev.preventDefault();
      visible.value = true;
      nextTick(() => {
        console.log(menuEl.value);
        const offset = {
          top: wrapEl.value?.offsetTop || 0,
          left: wrapEl.value?.offsetLeft || 0,
        };

        menuPosition.left = ev.pageX - offset.left;
        menuPosition.top = ev.pageY - offset.top;

        console.log(ev, offset, menuPosition);
      });
    };

    const hideContentFn = () => {
      visible.value = false;
    };

    onMounted(() => {
      window.addEventListener("click", hideContentFn);
      if (wrapEl.value)
        wrapEl.value?.addEventListener("contextmenu", showContentMenuFn);
    });

    onBeforeUnmount(() => {
      wrapEl.value?.removeEventListener("contextmenu", showContentMenuFn);
      window.removeEventListener("click", hideContentFn);
    });

    return () => (
      <div
        class="contextmenu__wrap"
        ref={(el) => (wrapEl.value = el as HTMLElement)}
      >
        {visible.value ? (
          <Contextmenu
            ref={(el) =>
              (menuEl.value = el as InstanceType<typeof Contextmenu>)
            }
            options={props.options}
            v-model={visible.value}
            position={menuPosition}
          ></Contextmenu>
        ) : null}

        {slots.default?.()}
      </div>
    );
  },
});
