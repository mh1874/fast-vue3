<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import Header from '/@/components/Header/index.vue';
  import { frameRoutes } from '/@/router';
  import { Menu as IconMenu } from '@element-plus/icons-vue';
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };

  const route = useRouter();
  const activeMenu = computed(() => {
    const { meta, name } = route.currentRoute.value;
    if (meta !== null || meta !== undefined) {
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
    }
    return name;
  });
</script>
<template>
  <el-container class="app-container" direction="vertical">
    <el-header class="header-container">
      <Header />
    </el-header>
    <el-container class="main-content">
      <el-aside width="260px">
        <el-menu
          router
          active-text-color="#3dcd58"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="activeMenu"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
          <!-- <el-sub-menu index="1">
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu> -->
          <el-menu-item v-for="item in frameRoutes" :key="item.name" :index="item.name">
            <el-icon><icon-menu /></el-icon>
            <span>{{ item.name }}</span>
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

  .header-container {
    height: 60px;
    line-height: 60px;
  }

  .main-content {
    width: 100%;
    height: calc(100% - 60px);

    .el-menu {
      height: 100%;
    }

    .el-main {
      height: 100%;
    }
  }
</style>
