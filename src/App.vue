<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted } from "vue";
import VContextmenu from "./components/contextmenu/src/index";

import type { ContextmenuItem } from "./components/contextmenu/src/typescript";
import "./components/contextmenu/src/index.scss";

export default defineComponent({
  components: { VContextmenu },
  setup() {
    const menus: ContextmenuItem[] = [
      {
        command: "copy",
        text: "复制",
      },
      {
        command: "paste",
        text: "粘贴",
      },
      {
        command: "move",
        text: "移动",
      },
      {
        divider: true,
      },
      {
        command: "delete",
        text: "删除",
      },
      {
        command: "rename",
        text: "重命名",
        disabled: true,
      },
      {
        command: "new",
        text: "新建",
        children: [
          {
            command: "rename",
            text: "重命名",
          },
        ],
      },
    ];
    const menuList: ContextmenuItem[] = [
      {
        command: "new",
        text: "新建",
      },
      {
        command: "copy",
        text: "复制",
      },
      {
        command: "paste",
        text: "粘贴",
      },
      {
        command: "move",
        text: "移动",
      },
      {
        divider: true,
      },
      {
        command: "delete",
        text: "删除",
      },
      {
        command: "rename",
        text: "重命名",
      },
    ];

    const menuClick = (item: any) => {
      alert(`command：${item.command}；text：${item.text}`);
    };

    return {
      menus,
      menuList,
      menuClick,
    };
  },
});
</script>

<template>
  <div class="wrap">
    <h1>ContextMenu 右键菜单</h1>
    <div class="wrap-item">
      <div>
        <h2>基础用法</h2>
        <p>最常用的方式，通过 <mark>options</mark> 定义菜单的数据</p>
      </div>
      <div class="content">
        <v-contextmenu :options="menus" @menu-click="menuClick">
          <p>在此区域内显示自定义右键菜单</p>
          <p>在此区域内显示自定义右键菜单</p>
          <p>在此区域内显示自定义右键菜单</p>
          <p>在此区域内显示自定义右键菜单</p>
          <p>在此区域内显示自定义右键菜单</p>
          <p>在此区域内显示自定义右键菜单</p>
          <p>在此区域内显示自定义右键菜单</p>
        </v-contextmenu>
      </div>
    </div>

    <div class="wrap-item">
      <div>
        <h2>通过指令的方式调用</h2>
        <p>最常用的方式，通过 <mark>menus</mark> 定义菜单的数据</p>
      </div>
      <div
        v-contextmenu="{
          options: menus,
          onMenuClick: menuClick,
        }"
      >
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
      </div>
    </div>
    <div class="wrap-item">
      <div>
        <h2>通过指令的方式调用</h2>
        <p>最常用的方式，通过 <mark>menus</mark> 定义菜单的数据</p>
      </div>
      <div
        v-contextmenu="{
          options: menuList,
          onMenuClick: menuClick,
        }"
      >
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
      </div>
    </div>

    <!-- <div class="wrap-item">
      <div>
        <h2>自定义</h2>
        <p>
          通过
          <mark>menuItemClass</mark>
          定义菜单容器的样式,通过<mark>menuItemClass</mark>来定义菜单项的样式
        </p>
      </div>

      <yak-contextmenu
        :options="menus"
        @menu-click="menuClick"
        menu-item-class="custom-item-style"
      >
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
      </yak-contextmenu>
    </div>

    <div class="wrap-item">
      <div>
        <h2>完全自定义</h2>
        <p>
          通过重写
          <mark>slot menu</mark> 来重写菜单，同时 <mark>menuItemClass</mark>和
          <mark>menu-click</mark>事件无效
        </p>
      </div>

      <yak-contextmenu :options="menus" @menu-click="menuClick">
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <p>在此区域内显示自定义右键菜单</p>
        <template #menu="{ menuList }">
          <div
            v-for="item in menuList"
            :key="item.command"
            @click="menuClick(item)"
            class="custom-item-style"
            style="padding-left: 12px; padding-right: 12px"
          >
            {{ item.text }}
          </div>
        </template>
      </yak-contextmenu>
    </div> -->

    <div class="wrap-item">
      <table>
        <thead>
          <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>options</td>
            <td>配置菜单的数组。例子:[{command: 'copy', text: '复制'}]</td>
            <td>Array</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>menuWrapClass</td>
            <td>菜单容器的类名。</td>
            <td>String</td>
            <td>-</td>
          </tr>
          <tr>
            <td>menuItemClass</td>
            <td>菜单子项的类名。</td>
            <td>String</td>
            <td>-</td>
          </tr>
          <tr>
            <td>menu-click</td>
            <td>点击菜单时触发的事件。</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>container</td>
            <td>触发菜单的容器</td>
            <td>HTMLElement | css选择器</td>
            <td>body</td>
          </tr>
          <tr>
            <td>width</td>
            <td>菜单的宽度</td>
            <td>String | Number</td>
            <td>200</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  min-height: 98vh;
}
.wrap {
  width: 800px;
  margin: 0 auto;
  padding: 40px 0 20px;
  font-size: 15px;
  color: #303133;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  &-item {
    margin-top: 24px;
  }
}
.custom-item-style {
  line-height: 34px;
  &:hover {
    background-color: #409eff;
    color: white;
  }
}

mark {
  font-family: Roboto Mono, Monaco, courier, monospace;
  word-break: break-word;
  border-radius: 2px;
  overflow-x: auto;
  background-color: #fff5f5;
  color: #e96900;
  font-size: 0.87em;
  padding: 0.065em 0.4em;
  margin: 0 2px;
}
p {
  line-height: 1.6em;
  margin: 0;
}
table {
  border-collapse: collapse;
}
thead {
  background-color: #dfdfdf;
}
th,
td {
  line-height: 34px;
  padding: 0 12px;
  text-align: left;
  border: 1px solid #eaeaea;
}
</style>
