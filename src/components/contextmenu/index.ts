import Contextmenu from "./src/ContextMenu.vue";

Contextmenu.install = (app: any) => {
  app.component(Contextmenu.name, Contextmenu);
};

export default Contextmenu;
