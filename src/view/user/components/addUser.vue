<template>
  <el-dialog title="新建/编辑用户" :visible="showDialog" @close="cancel">
    <el-form class="form" ref="form" :rules="rules" :model="formData">
      <el-row type="flex" justify="space-between">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formData.sex" placeholder="请选择">
            <el-option
                v-for="item in sexArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="formData.age"></el-input>
        </el-form-item>
      </el-row>
      <h3> 详细地址</h3>
      <el-row type="flex" justify="space-between">
        <el-form-item prop="basicAddress">
          <el-cascader
              v-model="formData.basicAddress"
              :options="options"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item prop="moreAddress">
          <el-input v-model="formData.moreAddress" placeholder="请输入详细地址" style="width: 300px;"></el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <el-row class="btn" type="flex" justify="center">
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button size="mini" type="primary" @click="saveUser">保存</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "addUser",
  data() {
    return {
      sexArr: [
        {
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }
      ],
      formData: {
        name: '',
        sex: '',
        age:'',
        phone: '',
        basicAddress: '',
        moreAddress: ''
      },
      options: [
        {
          value: '广东省',
          label: '广东省',
          children: [
            {
              value: '广州市',
              label: '广州市',
              children: [
                {
                  value: '番禺区',
                  label: '番禺区',
                },
                {
                  value: '越秀区',
                  label: '越秀区',
                },
                {
                  value: '花都区',
                  label: '花都区',
                },
                {
                  value: '海珠区',
                  label: '海珠区',
                },
                {
                  value: '天河区',
                  label: '天河区',
                }
              ]
            }
          ]
        }
      ],
      rules:{
        name:[
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        age:[
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        sex:[
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        phone:[
          {required: true, message: '请联系电话', trigger: 'blur'}
        ],
        basicAddress:[
          {required: true, message: '请选择地址', trigger: 'blur'}
        ],
      }
    }
  },
  props:['showDialog'],
  methods:{
    ...mapActions(['addUser','modifyUser']),
    saveUser(){
      this.$refs.form.validate((valid)=>{
        if(valid){
          let address = ''
          address = this.formData.basicAddress.join('') + ' ' + this.formData.moreAddress
          //没有index 就是添加
          this.formData.index===undefined ?this.addUser({...this.formData,address}):this.modifyUser({...this.formData,address})
          this.cancel()
        }
      })
    },
    cancel(){
      this.closeDialog()
      this.formData = {
        name: '',
        sex: '',
        age:'',
        phone: '',
        basicAddress: '',
        moreAddress: '',
      }
    },
    closeDialog(){
      //关闭弹层
      this.$emit('update:showDialog',false)
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  width: 80%;
  margin: 0 auto;
}

.btn {
  margin-top: 50px;
}
</style>
