<template>
  <div class="page-container">
    <el-form :model="listQuery" :inline="true" label-width="120px" label-suffix=":">
      <el-row>
        <el-form-item :label="$t('users.listQuery.username')">
          <el-input v-model="listQuery.username" :placeholder="$t('users.listQuery.placeholderUsername')" />
        </el-form-item>
        <el-form-item :label="$t('users.listQuery.description')">
          <el-input v-model="listQuery.description" :placeholder="$t('users.listQuery.placeholderDescription')" />
        </el-form-item>
        <el-form-item :label="$t('users.listQuery.prizeName')">
          <el-select v-model="listQuery.prizeId" value="" :placeholder="$t('users.listQuery.placeholderPrizeName')">
            <el-option v-for="item in allPrize" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row style="text-align: center">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('users.listButton.search') }}</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="handleReset">{{ $t('users.listButton.reset') }}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleDetail()">{{ $t('users.listButton.add') }}</el-button>
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
      <el-table-column :label="$t('users.table.avatar')" align="center">
        <template slot-scope="scope">
          <div class="table-column-image">
            <img v-if="scope.row.avatar" :src="scope.row.avatar" alt="avatar">
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('users.table.username')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('users.table.description')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('users.table.prizeImage')" align="center">
        <template slot-scope="scope">
          <div class="table-column-image">
            <img v-if="scope.row.prizeImage" :src="scope.row.prizeImage" alt="prizeImage">
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('users.table.prizeName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.prizeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('users.table.operateTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('users.table.operation')" fixed="right" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row.id)">{{ $t('users.table.edit') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">{{ $t('users.table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageLimit" @pagination="getList" />

    <el-dialog
      :title="user.id ? $t('users.item.editTitle') : $t('users.item.addTitle')"
      :visible.sync="dialogFormVisible"
      @close="handleFormClose('userForm')"
    >
      <el-form ref="userForm" :model="user" :rules="userRules" label-width="120px" label-suffix=":">
        <el-form-item :label="$t('users.item.avatar')" prop="avatar">
          <upload-image :image-url="user.avatar" @upload-path="uploadFilePath" />
        </el-form-item>
        <el-form-item :label="$t('users.item.username')" prop="username">
          <el-input v-model="user.username" :placeholder="$t('users.item.placeholderUsername')" />
        </el-form-item>
        <el-form-item :label="$t('users.item.description')" prop="description">
          <el-input v-model="user.description" :placeholder="$t('users.item.placeholderDescription')" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose('userForm')">{{ $t('users.item.formCancel') }}</el-button>
        <el-button type="primary" @click="handleFormSubmit('userForm')">{{ $t('users.item.formConfirm') }}</el-button>
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
        sort: '-operateTime',
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
        this.allPrize.sort((a, b) => {
          return a.number - b.number
        })
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
        sort: '-operateTime',
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
