import { defineComponent, PropType } from "vue";
import { ContextmenuItem } from "./typescript";

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<ContextmenuItem>,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => {
      props.options.divider ? (
        <div class="contextmenu-item is-divider"></div>
      ) : (
        <div class="contextmenu-item">
          <span>{props.options?.text}</span>
        </div>
      );
    };
  },
});
