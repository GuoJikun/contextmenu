import {
  type App,
  type DirectiveBinding,
  h,
  render,
  type ComponentPublicInstance,
  type ObjectDirective
} from 'vue'
import type { Menus } from './src/typescript'
import ContextMenu from './src/ContextMenu.vue'
import { createClassDom } from './src/utils'

export type Props = {
  options: Menus
  container?: HTMLElement
  menuWrapClass?: string
  menuItemClass?: string
  appendToBody?: boolean
  width?: number | string
}

function ContextmenuFunction(options: Props) {
  const className = '__mouse__menu__container'

  const container: HTMLElement = createClassDom('div', className)

  const vm = h(ContextMenu, options)
  render(vm, container)
  document.body.appendChild(container)
  return vm.component?.proxy as ComponentPublicInstance<typeof ContextMenu>
}

type ContextMenuListenFn = (e: MouseEvent) => void
type TouchListenFn = (e: TouchEvent) => void

// 指令封装
let contextMenuEvent: ContextMenuListenFn
let longPressEvent: TouchListenFn
const mounted = (el: HTMLElement, binding: DirectiveBinding) => {
  const { value } = binding
  if (value.options.length > 0) {
    ContextmenuFunction({
      container: el,
      ...value
    })
  } else {
    throw new Error('At least set one menu list!')
  }
}

const ContextmenuDirective: ObjectDirective = {
  mounted
}

export type PluginConf = {
  type?: string
}

export { ContextmenuDirective, ContextmenuFunction }

export default {
  install: (app: App, conf: PluginConf = { type: 'component' }): void => {
    const type = conf.type
    if (type === 'component') {
      app.component('yak-contextmenu', ContextMenu)
    } else if (type === 'directive') {
      app.directive('contextmenu', ContextmenuDirective)
    } else if (type === 'both') {
      app.component('yak-contextmenu', ContextMenu)
      app.directive('contextmenu', ContextmenuDirective)
    } else {
      throw new Error("type must be 'component' or 'directive' or 'both")
    }
  }
}
