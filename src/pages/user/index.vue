<script lang="ts">
  export default {
    name: 'User',
  };
</script>

<script setup lang="ts">
  import { reactive, ref, onMounted, toRefs } from 'vue';

  // api
  // import { listUserPages, importUser } from '@/api/user';
  // import { listDeptOptions } from '@/api/dept';
  // import { listRoleOptions } from '@/api/role';

  import { ElForm } from 'element-plus';
  import { Search, Plus, Refresh, Download } from '@element-plus/icons-vue';
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
    dialog: {
      visible: false,
    } as DialogType,
    // 部门下拉项
    deptOptions: [] as OptionType[],
    queryParams: {
      pageNum: 1,
      pageSize: 10,
    } as UserQuery,
    rules: {
      username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
      nickname: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
      deptId: [{ required: true, message: '所属部门不能为空', trigger: 'blur' }],
      roleIds: [{ required: true, message: '用户角色不能为空', trigger: 'blur' }],
      email: [
        {
          pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
          message: '请输入正确的邮箱地址',
          trigger: 'blur',
        },
      ],
      mobile: [
        {
          pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          message: '请输入正确的手机号码',
          trigger: 'blur',
        },
      ],
    },

    importDialog: {
      title: '用户导入',
      visible: false,
    } as DialogType,
    excelFile: undefined as any,
    excelFilelist: [] as File[],
  });

  const { loading, queryParams, userList, total } = toRefs(state);

  /**
   * 查询
   */
  function handleQuery() {
    state.loading = true;
    const data = {
      list: [
        {
          id: '1',
          username: 'root',
          nickname: '有来技术',
          mobile: '17621590365',
          genderLabel: '女',
          avatar: 'https://s2.loli.net/2022/04/07/gw1L2Z5sPtS8GIl.gif',
          email: null,
          status: 1,
          deptName: null,
          roleNames: '超级管理员',
          createTime: null,
        },
        {
          id: '2',
          username: 'admin',
          nickname: '系统管理员',
          mobile: '17621210366',
          genderLabel: '男',
          avatar: 'https://s2.loli.net/2022/04/07/gw1L2Z5sPtS8GIl.gif',
          email: null,
          status: 1,
          deptName: '研发部门',
          roleNames: '系统管理员',
          createTime: '2019-10-10',
        },
      ],
      total: 2,
    };
    // listUserPages(state.queryParams).then(({ data }) => {
    state.userList = data.list;
    state.total = data.total;
    state.loading = false;
    // });
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

  /**
   * 添加用户
   **/
  async function handleAdd() {
    state.dialog = {
      title: '添加用户',
      visible: true,
    };
  }

  // /**
  //  * 删除用户
  //  */
  // function handleDelete(row: { [key: string]: any }) {
  //   const userIds = row.id || state.ids.join(',');
  //   ElMessageBox.confirm('是否确认删除用户编号为「' + userIds + '」的数据项?', '警告', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning',
  //   })
  //     .then(function () {
  //       deleteUsers(userIds).then(() => {
  //         ElMessage.success('删除成功');
  //         handleQuery();
  //       });
  //     })
  //     .catch(() => ElMessage.info('已取消删除'));
  // }

  /**
   * 导出用户
   */
  function handleExport() {
    // exportUser(queryParams.value).then((response: any) => {
    //   const blob = new Blob([response.data], {
    //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    //   });
    //   const a = document.createElement('a');
    //   const href = window.URL.createObjectURL(blob); // 下载的链接
    //   a.href = href;
    //   a.download = decodeURI(response.headers['content-disposition'].split(';')[1].split('=')[1]); // 获取后台设置的文件名称
    //   document.body.appendChild(a);
    //   a.click(); // 点击导出
    //   document.body.removeChild(a); // 下载完成移除元素
    //   window.URL.revokeObjectURL(href); // 释放掉blob对象
    // });
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
        <el-form-item label="关键字" prop="keywords">
          <el-input
            v-model="queryParams.keywords"
            placeholder="用户名/昵称/手机号"
            clearable
            style="width: 200px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 200px">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
          <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card>
      <template #header>
        <el-form-item style="float: left">
          <el-button type="success" :icon="Plus" @click="handleAdd">新增</el-button>
          <!-- <el-button type="danger" :icon="Delete" :disabled="ids.length === 0" @click="handleDelete" v-hasPerm="['sys:user:delete']"
                >删除</el-button
              > -->
        </el-form-item>
        <el-form-item style="float: right">
          <el-button :icon="Download" style="margin-left: 12px" @click="handleExport">导出</el-button>
        </el-form-item>
      </template>

      <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column key="id" label="编号" align="center" prop="id" width="100" />
        <el-table-column key="username" label="用户名" align="center" prop="username" />
        <el-table-column label="用户昵称" width="120" align="center" prop="nickname" />

        <el-table-column label="性别" width="100" align="center" prop="genderLabel" />

        <el-table-column label="部门" width="120" align="center" prop="deptName" />
        <el-table-column label="手机号码" align="center" prop="mobile" width="120" />

        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="操作" align="left" width="200">
          <!-- <template #default="scope">
                <el-button type="primary" link @click="handleUpdate(scope.row)" v-hasPerm="['sys:user:edit']">编辑</el-button>
                <el-button type="danger" link @click="handleDelete(scope.row)" v-hasPerm="['sys:user:del']">删除</el-button>
              </template> -->
        </el-table-column>
      </el-table>

      <pagination
        v-if="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </el-card>
  </div>
</template>
