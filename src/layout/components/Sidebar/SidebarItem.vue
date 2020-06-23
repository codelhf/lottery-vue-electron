<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <router-link
      v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow"
      :key="item.children[0].name"
      :to="item.path+'/'+item.children[0].path"
    >
      <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
        <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon" />
        <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{ generateTitle(item.children[0].meta.title) }}</span>
      </el-menu-item>
    </router-link>

    <el-submenu v-else :key="item.name" :index="item.name||item.path">
      <template slot="title">
        <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon" />
        <span v-if="item.meta&&item.meta.title" slot="title">{{ generateTitle(item.meta.title) }}</span>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :is-nest="true" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
import { generateTitle } from '@/i18n/index'

export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateTitle,
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      return showingChildren.length === 1
    }
  }
}
</script>
