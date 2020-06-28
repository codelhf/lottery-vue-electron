<template>
  <div class="page-container">
    <el-form :model="listQuery" :inline="true" label-width="120px" label-suffix=":">
      <el-row>
        <el-form-item :label="$t('prize.listQuery.name')">
          <el-input v-model="listQuery.name" :placeholder="$t('prize.listQuery.placeholderName')" />
        </el-form-item>
        <el-form-item :label="$t('prize.listQuery.description')">
          <el-input v-model="listQuery.description" :placeholder="$t('prize.listQuery.placeholderDescription')" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('prize.listButton.search') }}</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="handleReset">{{ $t('prize.listButton.reset') }}</el-button>
        </el-form-item>
      </el-row>
      <el-row style="text-align: right">
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="handleDetail()">{{ $t('prize.listButton.add') }}</el-button>
          <el-button type="primary" size="small" icon="el-icon-delete" @click="handleDelete()">{{ $t('prize.listButton.delete') }}</el-button>
          <el-button type="primary" size="small" icon="el-icon-document" @click="handleDocument()">{{ $t('prize.listButton.document') }}</el-button>
          <el-button type="primary" size="small" icon="el-icon-upload2" @click="handleUpload()">{{ $t('prize.listButton.upload') }}</el-button>
          <el-button type="primary" size="small" icon="el-icon-download" @click="handleDownload()">{{ $t('prize.listButton.download') }}</el-button>
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
      <el-table-column :label="$t('prize.table.prizeImage')" align="center">
        <template slot-scope="scope">
          <table-image :src="scope.row.image" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('prize.table.prizeName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('prize.table.prizeDesc')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('prize.table.prizeStock')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.stock }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('prize.table.prizeNumber')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('prize.table.operateTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('prize.table.operation')" align="center" width="260">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlePrizeUser(scope.row.id)">{{ $t('prize.table.prizeUsers') }}</el-button>
          <el-button type="primary" size="mini" @click="handleDetail(scope.row.id)">{{ $t('prize.table.edit') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">{{ $t('prize.table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageLimit" @pagination="getList" />

    <el-dialog
      :title="prize.id ? $t('prize.item.editTitle') : $t('prize.item.addTitle')"
      :visible.sync="dialogFormVisible"
      @close="handleFormClose('prizeForm')"
    >
      <el-form ref="prizeForm" :model="prize" :rules="prizeRules" label-width="120px" label-suffix=":">
        <el-form-item :label="$t('prize.item.image')" prop="image">
          <upload-image :image-url="prize.image" @upload-path="uploadFilePath" />
        </el-form-item>
        <el-form-item :label="$t('prize.item.name')" prop="name">
          <el-input v-model="prize.name" :placeholder="$t('prize.item.placeholderName')" />
        </el-form-item>
        <el-form-item :label="$t('prize.item.description')" prop="description">
          <el-input v-model="prize.description" :placeholder="$t('prize.item.placeholderDescription')" />
        </el-form-item>
        <el-form-item :label="$t('prize.item.stock')" prop="stock">
          <el-input-number v-model="prize.stock" :min="1" :placeholder="$t('prize.item.placeholderStock')" />
        </el-form-item>
        <el-form-item :label="$t('prize.item.number')" prop="number">
          <el-input-number v-model="prize.number" :min="1" :placeholder="$t('prize.item.placeholderNumber')" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose('prizeForm')">{{ $t('prize.item.formCancel') }}</el-button>
        <el-button type="primary" @click="handleFormSubmit('prizeForm')">{{ $t('prize.item.formConfirm') }}</el-button>
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
import { fetchPrizeList, fetchPrize, createPrize, updatePrize, deletePrize, batchCreatePrize } from '@/api/prize'
import Pagination from '@/components/Pagination'
import TableImage from '@/components/TableImage'
import UploadImage from '@/components/Upload'
import UploadExcel from '@/components/UploadExcel'
import { parseTime } from '@/utils'
import { writeExcel } from '@/utils/excel'

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
        sort: '+number',
        name: '',
        description: ''
      },
      multipleSelection: [],
      dialogFormVisible: false,
      prize: {
        id: '',
        image: '',
        name: '',
        description: '',
        stock: '',
        number: '',
        operateTime: ''
      },
      prizeRules: {
        name: [{ required: true, message: this.$t('prize.itemRules.name'), trigger: 'blur' }],
        description: [{ required: true, message: this.$t('prize.itemRules.description'), trigger: 'blur' }],
        stock: [{ required: true, message: this.$t('prize.itemRules.stock'), trigger: 'blur' }],
        number: [{ required: true, message: this.$t('prize.itemRules.number'), trigger: 'blur' }]
      },
      dialogUploadVisible: false,
      header: [
        { field: 'name', name: this.$t('prize.table.prizeName') },
        { field: 'description', name: this.$t('prize.table.prizeDesc') },
        { field: 'stock', name: this.$t('prize.table.prizeStock') },
        { field: 'number', name: this.$t('prize.table.prizeNumber') }
      ],
      prizeList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchPrizeList(this.listQuery).then(res => {
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
        sort: '+number',
        name: '',
        description: ''
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handlePrizeUser(id) {
      this.$router.push(`/user?prizeId=${id}`)
    },
    handleDetail(id) {
      this.dialogFormVisible = true
      this.prize = { image: '' }
      if (id) {
        fetchPrize(id).then(res => {
          if (!res.data.image) {
            res.data.image = ''
          }
          this.prize = res.data
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
          if (this.prize.id) {
            updatePrize(this.prize).then(res => {
              this.dialogFormVisible = false
              this.getList()
            })
          } else {
            createPrize(this.prize).then(res => {
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
        this.$confirm(this.$t('prize.confirm.deleteOne'), this.$t('prize.confirm.title'), {
          cancelButtonText: this.$t('prize.confirm.cancel'),
          confirmButtonText: this.$t('prize.confirm.confirm'),
          type: 'warning'
        }).then(() => {
          ids = id
          deletePrize(ids).then(() => {
            this.getList()
          })
        })
      } else if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('prize.confirm.deleteSelected'), this.$t('prize.confirm.title'), {
          cancelButtonText: this.$t('prize.confirm.cancel'),
          confirmButtonText: this.$t('prize.confirm.confirm'),
          type: 'warning'
        }).then(() => {
          const idsArr = []
          this.multipleSelection.map((item) => {
            idsArr.push(item.id)
          })
          ids = idsArr.join(',')
          deletePrize(ids).then(() => {
            this.getList()
          })
        })
      } else {
        this.$confirm(this.$t('prize.confirm.deleteAll'), this.$t('prize.confirm.title'), {
          cancelButtonText: this.$t('prize.confirm.cancel'),
          confirmButtonText: this.$t('prize.confirm.confirm'),
          type: 'warning'
        }).then(() => {
          deletePrize(ids).then(() => {
            this.getList()
          })
        })
      }
    },
    uploadFilePath(imageUrl) {
      this.prize.image = imageUrl
    },
    handleDocument() {
      writeExcel({ header: this.header, filename: this.$t('route.prize') })
    },
    handleDownload() {
      const header = [
        { field: 'name', name: this.$t('prize.table.prizeName') },
        { field: 'description', name: this.$t('prize.table.prizeDesc') },
        { field: 'stock', name: this.$t('prize.table.prizeStock') },
        { field: 'number', name: this.$t('prize.table.prizeNumber') },
        { field: 'operateTime', name: this.$t('prize.table.operateTime') }
      ]
      fetchPrizeList(null).then((res) => {
        const data = res.data.list
        data.map(item => {
          item.operateTime = parseTime(item.operateTime)
        })
        writeExcel({ data: data, header: header, filename: this.$t('route.prize') })
      })
    },
    handleUpload() {
      this.dialogUploadVisible = true
    },
    handleUploadClose() {
      this.dialogUploadVisible = false
    },
    handleUploadSuccess(data) {
      this.prizeList = data
    },
    handleUploadSubmit() {
      batchCreatePrize(this.prizeList).then(() => {
        this.dialogUploadVisible = false
        this.getList()
      })
    }
  }
}
</script>

<style scoped>

</style>
