<template>
  <div class="page-container">
    <el-form :model="listQuery" :inline="true" label-width="120px" label-suffix=":">
      <el-row>
        <el-form-item label="人员名称">
          <el-input v-model="listQuery.username" placeholder="请输入人员名称" />
        </el-form-item>
        <el-form-item label="人员描述">
          <el-input v-model="listQuery.description" placeholder="请输入人员描述" />
        </el-form-item>
        <el-form-item label="奖品名称">
          <el-select v-model="listQuery.prizeId" value="" placeholder="请选择奖品名称">
            <el-option v-for="item in allPrize" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row style="text-align: center">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="handleReset">重置</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleDetail">增加人员</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      highlight-current-row
      border="border"
    >
      <el-table-column label="人员头像" align="center">
        <template slot-scope="{row}">
          <div class="table-column-image">
            <img :src="row.avatar" alt="avatar">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="人员名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人员描述" align="center">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖品图片" align="center">
        <template slot-scope="{row}">
          <div class="table-column-image">
            <img :src="row.prizeImage" alt="prizeImage">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="奖品名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prizeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.operateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="160">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleDetail(row.id)">详情</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageLimit" @pagination="getList" />

    <el-dialog
      :title="user.id ? '修改人员' : '新增人员'"
      :visible.sync="dialogFormVisible"
      @close="handleFormClose('userForm')"
    >
      <el-form ref="userForm" :model="user" :rules="userRules" label-width="120px" label-suffix=":">
        <el-form-item label="人员头像" prop="avatar">
          <upload-image :file-url="user.avatar" @upload-path="uploadFilePath" />
        </el-form-item>
        <el-form-item label="人员名称" prop="username">
          <el-input v-model="user.username" placeholder="请输入人员名称" />
        </el-form-item>
        <el-form-item label="人员描述" prop="description">
          <el-input v-model="user.description" placeholder="请输入人员描述" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose('userForm')">返回</el-button>
        <el-button type="primary" @click="handleFormSubmit('userForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchUserList, fetchUser, createUser, updateUser, deleteUser } from '@/api/users'
import { fetchPrizeList } from '@/api/prize'
import Pagination from '@/components/Pagination'
import UploadImage from '@/components/Upload'
import { parseTime } from '@/utils'

export default {
  name: 'Prize',
  components: {
    Pagination,
    UploadImage
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageLimit: 10,
        sort: '+update_time',
        prizeId: '',
        username: '',
        description: ''
      },
      allPrize: [],
      dialogFormVisible: false,
      user: {
        id: '',
        avatar: '',
        username: '',
        description: '',
        prizeId: '',
        operateTime: ''
      },
      userRules: {
        username: [{ required: true, message: '人员名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '人员描述不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    const { prizeId } = this.$route.query
    if (prizeId) {
      this.listQuery.prizeId = prizeId
    }
    this.getAllPrize()
    this.getList()
  },
  methods: {
    getAllPrize() {
      fetchPrizeList({}).then(res => {
        this.allPrize = res.data.list
      })
    },
    getList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(res => {
        this.list = res.data.list
        this.list.map(item => {
          item.operateTime = parseTime(item.operateTime)
        })
        this.total = res.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleReset() {
      this.listQuery = {
        currentPage: 1,
        pageLimit: 10,
        sort: '+update_time',
        prizeId: '',
        username: '',
        description: ''
      }
    },
    handleDetail(id) {
      this.dialogFormVisible = true
      this.user = {}
      if (id) {
        fetchUser(id).then(res => {
          this.user = res.data
        })
      }
    },
    handleFormClose(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    handleFormSubmit(formName) {
      this.$refs[formName].validate(validate => {
        if (validate) {
          if (this.user.id) {
            updateUser(this.user).then(res => {
              this.dialogFormVisible = false
              this.getList()
            })
          } else {
            createUser(this.user).then(res => {
              this.dialogFormVisible = false
              this.getList()
            })
          }
        }
      })
    },
    handleDelete(ids) {
      deleteUser(ids).then(res => {
        this.getList()
      })
    },
    uploadFilePath(imageUrl) {
      this.user.avatar = imageUrl
    }
  }
}
</script>

<style scoped>
  .table-column-image{
    display: inline-block;
    width: 80px;
    height: 80px;
    border: 1px solid #eeeeee;
    border-radius: 4px;
  }
  .table-column-image img{
    width: 100%;
    height: 100%;
  }
</style>
