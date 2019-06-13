<template>
<div class="from-wrap">
    <el-form ref="form" :model="form" :rules='rules' label-width="80px" class="login"> 
  <el-form-item label="用户名" prop="userName">
    <el-input v-model="form.userName"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="form.password"></el-input>
  </el-form-item>
  
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
import { win32 } from 'path';
  export default {
    data() {
      return {
        form: {
          userName:'admin',
          password:'123456'
        },
        rules:{
        userName:[
            {required:true,message:'请输入用户名',trigger:'blur'}
        ],
        password:[
            {required:true,message:'请输入密码',trigger:'blur'}
        ],
        }
      }
    },
    
    methods: {
      onSubmit() {
          //使用refs收集用户输入的信息
          const data={
              uname:this.form.userName,
              upwd:this.form.password,
          }
         
          //如果表单的验证不通过，不提交表单
          this.$refs.form.validate((valid)=>{
            //验证通过
            if (valid){
                //发送请求
                    this.$axios({
                    //请求的地址
                    url:'http://localhost:8899/admin/account/login',
                    //设置发送方式
                    method:'POST',
                    //发送数据
                    data:data,
                    //设置跨域，单词忘记了不要紧，可以在官网找
                    withCredentials:true,
            //  返回的是一个promise对象，then接收成功的数据，catch接收失败的数据
            }).then(res=>{
                console.log(res);
                //解构赋值
                const{message,status}=res.data

                this.$store.commit('setUser',message)
                //判断返回的数值
                if(status===0){
                    this.$router.push('/')
                    
                }
                if (status===1){
                    this.$message.error(message)
                }
            })
            }
          })
       
      }
    }
  }
</script>
<style scoped>
    .from-wrap{
        width: 100%;
        /* background-color: skyblue; */
        position: absolute;
        top: 0;
        bottom: 0;
    }
    .login{
        width: 500px;
        position: absolute;
        left: 50%;
        margin-left: -250px;
        top: 50%;
        margin-top: -95px;
    }
</style>
