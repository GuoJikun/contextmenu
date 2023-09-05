import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { slots }) {
    return () => <div class="contextmenu__wrap">{slots.default?.()}</div>;
  },
});
