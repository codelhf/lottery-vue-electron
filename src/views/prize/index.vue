<template>
  <div class="page-container">
    <el-form :model="listQuery" :inline="true" label-width="120px" label-suffix=":">
      <el-row>
        <el-form-item label="奖品名称">
          <el-input v-model="listQuery.name" placeholder="请输入奖品名称" />
        </el-form-item>
        <el-form-item label="奖品描述">
          <el-input v-model="listQuery.description" placeholder="请输入奖品描述" />
        </el-form-item>
      </el-row>
      <el-row style="text-align: center">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="handleReset">重置</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleDetail()">增加奖品</el-button>
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
      <el-table-column label="奖品图片" align="center">
        <template slot-scope="{row}">
          <div class="table-column-image">
            <img :src="row.image" alt="image">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="奖品名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖品描述" align="center">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖品数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.stock }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖品顺序" align="center">
        <template slot-scope="{row}">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.operateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="260">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handlePrizeUser(row.id)">中奖人员</el-button>
          <el-button type="primary" size="mini" @click="handleDetail(row.id)">详情</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageLimit" @pagination="getList" />

    <el-dialog
      :title="prize.id ? '修改奖品' : '新增奖品'"
      :visible.sync="dialogFormVisible"
      @close="handleFormClose('prizeForm')"
    >
      <el-form ref="prizeForm" :model="prize" :rules="prizeRules" label-width="120px" label-suffix=":">
        <el-form-item label="奖品图片" prop="image">
          <upload-image :file-url="prize.image" @upload-path="uploadFilePath" />
        </el-form-item>
        <el-form-item label="奖品名称" prop="name">
          <el-input v-model="prize.name" placeholder="请输入奖品名称" />
        </el-form-item>
        <el-form-item label="奖品描述" prop="description">
          <el-input v-model="prize.description" placeholder="请输入奖品描述" />
        </el-form-item>
        <el-form-item label="奖品数量" prop="stock">
          <el-input-number v-model="prize.stock" :min="1" placeholder="请输入奖品数量" />
        </el-form-item>
        <el-form-item label="奖品顺序" prop="number">
          <el-input-number v-model="prize.number" :min="1" placeholder="请输入奖品顺序" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose('prizeForm')">返回</el-button>
        <el-button type="primary" @click="handleFormSubmit('prizeForm')">确定</el-button>
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
