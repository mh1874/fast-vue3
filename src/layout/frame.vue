<script setup lang="ts">
  import Header from '/@/components/Header/index.vue';
  import { Menu as IconMenu } from '@element-plus/icons-vue';
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
</script>
<template>
  <el-container class="app-container" direction="vertical">
    <el-header>
      <Header />
    </el-header>
    <el-container class="main-content">
      <el-aside width="260px">
        <el-menu
          router
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="dashboard">
            <el-icon><icon-menu /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
  .version {
    display: inline-block;
    padding: 6px;
    margin-left: 6px;
    border-radius: 10px;
  }

  .app-container {
    width: 100%;
    height: 100%;
  }

  .main-content {
    width: 100%;
    height: 100%;

    .el-menu {
      height: 100%;
    }

    .el-main {
      height: 100%;
    }
  }
</style>
