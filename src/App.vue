<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { ElConfigProvider } from 'element-plus';

  // 导入 Element Plus 语言包
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  const locale = ref(zhCn);
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: var(--color-bg-1);
  }
</style>
