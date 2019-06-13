<template>
  <div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.title }}</span>
        <span>
          <input type="text" 
          :value="data.sort_id"
          @blur='handelEditSId($event,data)'>
        </span>
        <span>
          <el-button type="text" size="mini"
           @click="() => append(data)">编辑</el-button>
          
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
 export default {
    data() {
      return {
        data:[]
      }
    },

    methods: {
      
      // 封装一个获取页面数据的函数
      getgoodlistdata(){
         this.$axios({
          url:'http://localhost:8899/admin/category/getlist/goods',
          method:'GET'
        }).then( res => {
          const {message,status} = res.data 
          // console.log(res.data);
          if (status===0){
            this.data=message
          }else{
            this.$message.error(message)
          }
        })
      },
      // 离开焦点触发的事件
      handelEditSId(event,data){
        if(event.target.va==data.sort_id){
          return
        }
        var res=window.confirm('是否确定修改')
        if (res){
          this.$axios({
            url:'http://localhost:8899/admin/category/edit/'+data.category_id,
            method:'POST',
            data:{
              ...data,
              sort_id:event.target.value
            },
             // 处理session跨域
             withCredentials: true
          }).then( res =>{
            const {status,message}=res.data
            if (status===0){ 
              this.getgoodlistdata()
            }else{
              this.$message.error(message)
            }
          })
        }
      }
    },
    mounted(){
        this.getgoodlistdata()
    }
  };
</script>

<style>
    .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .custom-tree-node input{
      width:60px;
      height:20px!important;
  }
</style>
