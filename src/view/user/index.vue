<template>
  <div class="user">
    <div class="title">
      <h3>用户管理</h3>
    </div>
    <el-row class="tab-action" type="flex" justify="space-between">
      <el-row class="left" type="flex">
        <el-button type="primary" size="mini" class="add" @click="modifyUser(false)">新建</el-button>
        <el-input v-model="searchVal" placeholder="按姓名关键字搜索" @input="search" size="mini" class="search"></el-input>
      </el-row>
      <el-row class="right">
        <el-col>
          <el-button type="warning" size="mini" class="revoke" @click="toRevoke">撤销</el-button>
        </el-col>
      </el-row>
    </el-row>
    <div class="tabel">
      <el-table
          :data="data"
          style="width: 100%"
          border
          @selection-change="select"
      >
        <el-table-column
            type="selection"
            width="45"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="80"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄"
            width="80"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            align="center"
            width="80"
        >
        </el-table-column>
        <el-table-column
            prop="phone"
            label="联系电话"
            align="center"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="address"
            label="详细地址"
            align="center"
        >
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="150"
            align="center"
        >
          <template slot-scope="scope">
            <el-row type="flex" justify="center">
              <el-button size="mini" @click="modifyUser(true,{index:scope.$index,...scope.row})">编辑</el-button>
              <el-button size="mini" @click="deleteOne(scope.row.name)">删除</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row class="all-delete">
      <el-button type="danger" @click="deleteAll" size="mini">批量删除</el-button>
    </el-row>
    <!-- 弹层-->
    <addUser ref="dialog" :showDialog.sync="showDialog"/>
  </div>

</template>

<script>
import addUser from "@/view/user/components/addUser";
import {mapState, mapActions} from 'vuex'
import {Message} from "element-ui";

export default {
  name: "myUser",
  components: {
    addUser
  },
  data() {
    return {
      tiemr: null,
      //选中的行
      selectItme: [],
      showDialog: false,
      searchVal: '',
      searchList: []
    }
  },
  computed: {
    ...mapState(['userList']),
    data() {
      return this.searchList.length ? this.searchList : this.userList
    }
  },
  methods: {
    ...mapActions(['deleteOneUser', 'deleteMore', 'revoke']),
    //撤销
    toRevoke() {
      this.$confirm('此操作撤销上一次的增加，删除或修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        //根据操作返回的promise 判断
        this.revoke().then(() => {
          Message.success({
            type: 'success',
            message: '撤销成功!'
          });
        }).catch((err) => {
          Message.success({
            type: 'warning',
            message: err
          });
        })

      }).catch(() => {
      })
    },
    //搜索
    search(val) {
      clearInterval(this.timer)
      this.timer = setTimeout(() => {
        if (val) {
          this.selectUserList(val.trim())
        } else {
          this.searchList = []
          this.searchVal = ''
        }
      }, 700)
    },
    //对state 进行模糊匹配
    selectUserList(key) {
      let userList = this.$store.state.userList
      this.searchList = userList.filter(item => {
        let index = item.name.indexOf(key)
        if (index > -1) {
          return item
        }
      })
      //判断是否有值
      //没有则提示,并且删除输入框值
      if (!this.searchList.length) {
        this.searchVal = ''
        Message.success({
          type: 'error',
          message: '未查找到内容！！！！'
        });
      }
    },
    //选择时行触发
    select(arr) {
      this.selectItme = [...arr]
    },
    //删除单个
    deleteOne(name) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteOneUser(name)
        Message.success({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
      })
    },
    //删除多个
    async deleteAll() {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.deleteMore(this.selectItme)
        Message.success({
          type: 'success',
          message: '删除成功!'
        });
      } catch (e) {
        console.log(e)
      }
    },
    //新增或修改
    modifyUser(boolean, data) {
      if (boolean) {
        //修改时
        this.$refs.dialog.formData = {...data}
      }
      this.showDialog = true
    },
  },
  watch: {
    //监听vuex 的变化
    userList() {
      //  判断当前是不是搜索的列表
      //  如果是，重新执行一下匹配函数
      if (this.searchList.length) {
        this.selectUserList(this.searchVal)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.user {
  .title {
    width: 100%;
    height: 100px;
    background-color: #eee;
    text-align: center;
    line-height: 100px;

    h3 {
      margin: 0;
    }
  }

  .tab-action {
    width: 1000px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 20px;

    .add {
      margin-right: 15px;
    }
  }

  .tabel {
    width: 1000px;
    margin: 0 auto;
  }

  .all-delete {
    width: 1000px;
    margin: 0 auto;
    margin-top: 15px;
  }


}
</style>
