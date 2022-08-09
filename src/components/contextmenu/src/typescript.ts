export type MenuItem = {
  text?: string;
  command?: string;
  disabled?: boolean;
  divider?: boolean;
  submenu?: MenuItem[];
  items?: MenuItem[];
};

export type Menus = MenuItem[];

export type Props = {
  options: Menus;
  container?: HTMLElement;
  menuWrapClass?: string;
  menuItemClass?: string;
  appendToBody?: boolean;
  width?: number | string;
};
