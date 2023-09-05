import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  PropType,
  nextTick,
  Transition,
  Teleport,
  defineComponent,
  inject,
  Ref,
  toRef,
} from "vue";
import { type } from "./utils";

import type { ContextmenuItem } from "./typescript";
import Item from "./item";

export type Menus = ContextmenuItem[];

export const Contextmenu = defineComponent({
  props: {
    modelValue: Boolean,
    options: {
      type: Array as PropType<Menus>,
      default: () => {
        return [];
      },
    },
    position: {
      type: Object,
      default() {
        return { left: 0, top: 0 };
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
  setup(props, { emit }) {
    const container = inject<Ref>("rootEl");
    const visible = toRef(props, "modelValue");

    const menuPosition: any = reactive({
      left: 0,
      top: 0,
    });

    const menuClick = (item: ContextmenuItem) => {
      if (props.submenuTrigger === "click") {
      } else {
        emit("menu-click", item);
      }
    };

    return () => (
      <Teleport disabled={!props.appendToBody} to="body">
        <Transition name="modal">
          <div
            class={["contextmenu", props.menuWrapClass]}
            style={{
              left: props.position.left,
              top: props.position.top,
              width: `${Number(props.width)}px`,
            }}
          >
            {props.options.map((c: ContextmenuItem) => {
              return <Item options={c}></Item>;
            })}
          </div>
        </Transition>
      </Teleport>
    );
  },
});

export default Contextmenu;
