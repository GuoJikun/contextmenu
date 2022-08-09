import type { AppContext, Plugin, App } from "vue";

export const type = (val: any) => {
  return Object.prototype.toString.call(val).slice(8, -1);
};

// fast create dom with class
export function createClassDom(
  tag: string,
  className: string,
  innerText?: string
) {
  let el = document.createElement(tag);
  el.setAttribute("class", className);
  if (innerText) el.innerText = innerText;
  return el;
}
