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
      </el-row>
      <el-row style="text-align: center">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('prize.listButton.search') }}</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="handleReset">{{ $t('prize.listButton.reset') }}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleDetail()">{{ $t('prize.listButton.add') }}</el-button>
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
      <el-table-column :label="$t('prize.table.prizeImage')" align="center">
        <template slot-scope="scope">
          <div class="table-column-image">
            <img v-if="scope.row.image" :src="scope.row.image" alt="">
          </div>
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
      <el-table-column :label="$t('prize.table.operation')" fixed="right" align="center" width="260">
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
  </div>
</template>

<script>
import { fetchPrizeList, fetchPrize, createPrize, updatePrize, deletePrize } from '@/api/prize'
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
        sort: '+number',
        name: '',
        description: ''
      },
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
        name: [{ required: true, message: '奖品名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '奖品描述不能为空', trigger: 'blur' }],
        stock: [{ required: true, message: '奖品数量不能为空', trigger: 'blur' }],
        number: [{ required: true, message: '奖品顺序不能为空', trigger: 'blur' }]
      }
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
    handlePrizeUser(id) {
      this.$router.push(`/user?prizeId=${id}`)
    },
    handleDetail(id) {
      this.dialogFormVisible = true
      this.prize = {}
      if (id) {
        fetchPrize(id).then(res => {
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
    handleDelete(ids) {
      deletePrize(ids).then(res => {
        this.getList()
      })
    },
    uploadFilePath(imageUrl) {
      this.prize.image = imageUrl
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
