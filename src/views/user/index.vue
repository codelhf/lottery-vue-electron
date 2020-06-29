<template>
  <div class="page-container">
    <el-form :model="listQuery" :inline="true" label-width="120px" label-suffix=":">
      <el-row>
        <el-form-item :label="$t('users.listQuery.username')">
          <el-input v-model="listQuery.username" :placeholder="$t('users.listQuery.placeholderUsername')" />
        </el-form-item>
        <el-form-item :label="$t('users.listQuery.prizeName')">
          <el-select v-model="listQuery.prizeId" value="" :placeholder="$t('users.listQuery.placeholderPrizeName')">
            <el-option v-for="item in allPrize" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('users.listButton.search') }}</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="handleReset">{{ $t('users.listButton.reset') }}</el-button>
        </el-form-item>
      </el-row>
      <el-row style="text-align: right">
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="handleDetail()">{{ $t('users.listButton.add') }}</el-button>
          <el-button type="primary" size="small" icon="el-icon-delete" @click="handleDelete()">{{ $t('users.listButton.delete') }}</el-button>
          <el-button type="primary" size="small" icon="el-icon-document" @click="handleDocument()">{{ $t('users.listButton.document') }}</el-button>
          <el-button type="primary" size="small" icon="el-icon-upload2" @click="handleUpload()">{{ $t('users.listButton.upload') }}</el-button>
          <el-button type="primary" size="small" icon="el-icon-download" @click="handleDownload()">{{ $t('users.listButton.download') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      highlight-current-row
      border="border"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column :label="$t('users.table.avatar')" align="center">
        <template slot-scope="scope">
          <table-image :src="scope.row.avatar" />
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
          <table-image :src="scope.row.prizeImage" />
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
      <el-table-column :label="$t('users.table.operation')" align="center" width="160">
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

    <el-dialog
      :title="$t('components.uploadExcel.importExcel')"
      :visible.sync="dialogUploadVisible"
      @close="handleUploadClose('uploadExcel')"
    >
      <upload-excel ref="uploadExcel" :header="header" @onSuccess="handleUploadSuccess" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleUploadClose('uploadExcel')">{{ $t('components.uploadExcel.formCancel') }}</el-button>
        <el-button type="primary" @click="handleUploadSubmit('uploadExcel')">{{ $t('components.uploadExcel.formConfirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchUserList, fetchUser, createUser, updateUser, deleteUser, batchCreateUser } from '@/api/users'
import { fetchPrizeList } from '@/api/prize'
import Pagination from '@/components/Pagination'
import TableImage from '@/components/TableImage'
import UploadImage from '@/components/Upload'
import UploadExcel from '@/components/UploadExcel'
import { parseTime } from '@/utils'
import { writeExcel } from '../../utils/excel'

export default {
  name: 'Prize',
  components: {
    Pagination,
    TableImage,
    UploadImage,
    UploadExcel
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
      multipleSelection: [],
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
        username: [{ required: true, message: this.$t('users.itemRules.username'), trigger: 'blur' }],
        description: [{ required: true, message: this.$t('users.itemRules.description'), trigger: 'blur' }]
      },
      dialogUploadVisible: false,
      header: [
        { field: 'avatar', name: this.$t('users.table.avatar') },
        { field: 'username', name: this.$t('users.table.username') },
        { field: 'description', name: this.$t('users.table.description') }
      ],
      userList: []
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDetail(id) {
      this.dialogFormVisible = true
      this.user = { avatar: '' }
      if (id) {
        fetchUser(id).then(res => {
          if (!res.data.avatar) {
            res.data.avatar = ''
          }
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
    handleDelete(id) {
      let ids = null
      if (id) {
        this.$confirm(this.$t('users.confirm.deleteOne'), this.$t('users.confirm.title'), {
          cancelButtonText: this.$t('users.confirm.cancel'),
          confirmButtonText: this.$t('users.confirm.confirm'),
          type: 'warning'
        }).then(() => {
          ids = id
          deleteUser(ids).then(() => {
            this.getList()
          })
        })
      } else if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('users.confirm.deleteSelected'), this.$t('users.confirm.title'), {
          cancelButtonText: this.$t('users.confirm.cancel'),
          confirmButtonText: this.$t('users.confirm.confirm'),
          type: 'warning'
        }).then(() => {
          const idsArr = []
          this.multipleSelection.map((item) => {
            idsArr.push(item.id)
          })
          ids = idsArr.join(',')
          deleteUser(ids).then(() => {
            this.getList()
          })
        })
      } else {
        this.$confirm(this.$t('users.confirm.deleteAll'), this.$t('users.confirm.title'), {
          cancelButtonText: this.$t('users.confirm.cancel'),
          confirmButtonText: this.$t('users.confirm.confirm'),
          type: 'warning'
        }).then(() => {
          deleteUser(ids).then(() => {
            this.getList()
          })
        })
      }
    },
    uploadFilePath(imageUrl) {
      this.user.avatar = imageUrl
    },
    handleDocument() {
      writeExcel({ header: this.header, filename: this.$t('route.users') })
    },
    handleDownload() {
      const header = [
        { field: 'username', name: this.$t('users.table.username') },
        { field: 'description', name: this.$t('users.table.description') },
        { field: 'prizeName', name: this.$t('users.table.prizeName') },
        { field: 'operateTime', name: this.$t('users.table.operateTime') }
      ]
      fetchUserList(null).then((res) => {
        const data = res.data.list
        data.map(item => {
          item.operateTime = parseTime(item.operateTime)
        })
        writeExcel({ data: data, header: header, filename: this.$t('route.users') })
      })
    },
    handleUpload() {
      this.$refs['uploadExcel'].fileList = []
      this.dialogUploadVisible = true
    },
    handleUploadClose() {
      this.dialogUploadVisible = false
    },
    handleUploadSuccess(data) {
      this.userList = data
    },
    handleUploadSubmit() {
      console.log(this.userList)
      batchCreateUser(this.userList).then(() => {
        this.dialogUploadVisible = false
        this.getList()
      })
    }
  }
}
</script>

<style scoped>

</style>
