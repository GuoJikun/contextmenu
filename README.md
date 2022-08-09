# yakContextmenu 鼠标右键菜单

## 安装

```bash
npm i yak-contextmenu
```

## 使用

```js
import {
  createApp
} from "vue";
import App from "./App.vue";
import Contextmenu from "yak-contextmenu";
import "yak-contextmenu/dist/index.css";

createApp(App).use(Contextmenu).mount("#app");
```

## Attr 和 event

| 属性名        | 说明                                                   | 类型   | 默认值 |
| ------------- | ------------------------------------------------------ | ------ | ------ |
| options         | 配置菜单的数组。例子:[{command: 'copy', text: '复制'}] | Array  | []     |
| menuWrapClass | 菜单容器的类名。                                       | String | -      |
| menuItemClass | 菜单子项的类名。                                       | String | -      |
| menu-click    | 点击菜单时触发的事件，默认参数是一个 Object。          | -      | -      |
| width    | 设置菜单的宽度          | String/Number      | 200px     |
| container    | 菜单生效的元素          | HTMLElement | 合法的css选择器      | document.body      |
