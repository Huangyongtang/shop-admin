<template>
<div>
    <el-container>
          <el-aside width='auto'>
              <Aside :isShow='isShow'></Aside>
          </el-aside>
        <el-container>
          <el-header>
              <Header @click="handleChange"></Header>
          </el-header>
          <el-main>
              <Mianbao></Mianbao>
              <router-view></router-view>
          </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
import Header from '../components/Header'
import Mianbao from '../components/Mianbao'
import Aside from '../components/Aside'
export default {
  data(){
    return {isShow:false,}
  },
    components:{
        Header,
        Mianbao,
        Aside,
    },
    methods:{
      handleChange(){
        this.isShow=!this.isShow
      }
    }
}
</script>

<style>
  .el-header, .el-footer {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
   
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    
   
  }
  
 div > .el-container {
        position: absolute;
        top:0;
        bottom:0;
        width:100%;
    }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>