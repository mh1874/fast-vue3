<script lang="ts">
  export default {
    name: 'User',
  };
</script>

<script setup lang="ts">
  import { reactive, ref, onMounted, toRefs } from 'vue';
  import { getUserList } from '/@/api/user'; // api

  import { ElForm } from 'element-plus';
  import { Search, Refresh } from '@element-plus/icons-vue';
  import { UserQuery, UserType } from '/@/api/user/types';

  const queryFormRef = ref(ElForm); // 查询表单

  const state = reactive({
    // 遮罩层
    loading: true,
    // 选中数组
    ids: [] as number[],
    // 总条数
    total: 0,
    userList: [] as UserType[],
    queryParams: {
      searchValue: '',
      page: 1,
      rows: 10,
    } as UserQuery,
  });

  const { loading, queryParams, userList, total } = toRefs(state);

  /**
   * 查询
   */
  function handleQuery() {
    state.loading = true;
    getUserList(state.queryParams).then(({ data, total }) => {
      state.userList = data;
      state.total = total;
      state.loading = false;
    });
  }

  /**
   * 重置
   */
  function resetQuery() {
    queryFormRef.value.resetFields();
    handleQuery();
  }

  /**
   * 行选中
   */
  function handleSelectionChange(selection: any) {
    state.ids = selection.map((item: any) => item.id);
  }

  onMounted(() => {
    // 初始化用户列表数据
    handleQuery();
  });
</script>

<template>
  <div class="container">
    <div class="search">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <!-- 用户数据 -->
        <el-form-item label="关键字" prop="searchValue">
          <el-input
            v-model="queryParams.searchValue"
            placeholder="姓名/身份证号/手机号"
            clearable
            style="width: 200px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <!-- <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 200px">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
          <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card>
      <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column key="name" label="姓名" width="120" align="center" prop="name" />
        <el-table-column label="身份证号" width="180" align="center" prop="idCard" />
        <el-table-column label="手机号" width="150" align="center" prop="phoneNumber" />
        <el-table-column label="单位名称" width="120" align="center" prop="companyName" />
        <el-table-column label="是否法人" align="center" prop="isLegalPerson" width="120" />
        <el-table-column label="所在省市县区" align="center" width="200" prop="city" />
        <el-table-column label="婚姻状态" align="center" prop="maritalStatus" />
        <el-table-column label="全年收入" align="center" prop="annualIncome" />
        <el-table-column label="提交时间" align="center" prop="createTime" width="180" />
        <!-- <el-table-column label="操作" align="left" width="200"> -->
        <!-- <template #default="scope">
                <el-button type="primary" link @click="handleUpdate(scope.row)" v-hasPerm="['sys:user:edit']">编辑</el-button>
                <el-button type="danger" link @click="handleDelete(scope.row)" v-hasPerm="['sys:user:del']">删除</el-button>
              </template> -->
        <!-- </el-table-column> -->
      </el-table>

      <pagination
        v-if="total > 0"
        :total="total"
        v-model:page="queryParams.page"
        v-model:limit="queryParams.rows"
        @pagination="handleQuery"
      />
    </el-card>
  </div>
</template>
