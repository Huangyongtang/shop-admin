<template>
    <div>
        <el-row type="flex" justify="space-between">
            <div class="arrow" @click='handelClick'>
                <i class="el-icon-back"></i>
            </div>
            <div>
                {{user.user}} {{user.uname}} 
                <span @click="handelQuit" class="handelQuit">退出</span>
            </div>
        </el-row>
    </div>
</template>

<script>
import { win32 } from 'path';
import { constants } from 'crypto';
export default {
    data(){
        return {
            user:{}
        }
    },
   methods:{
        handelClick(){
        this.$emit('click')
    },
    // 退出按钮注册事件，把内地存储的值删除
    handelQuit(){
        this.$axios({
            url:'http://localhost:8899/admin/account/logout',
            method:'GET',
            // 处理跨域
            withCredentials:true
             
        }).then( res =>{
            const {message,status} =res.data
            if (status===0){
                this.$message.success(message)
                // 退出成功后清除本地数据并跳转
                localStorage.removeItem('user')
                this.$router.push('/login')
            }else{
                this.$message.error(message)
            }
        })
        
    }
   },
   mounted(){
       this.user =this.$store.state.user
       console.log(this.user, 123);
   }
}
</script>

<style>
.arrow, .handelQuit{
    cursor: pointer;
    
}
</style>
