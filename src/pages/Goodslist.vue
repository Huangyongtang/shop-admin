<template>
    <div>
        <!-- el-row是一个布局工具，type选flex的话就是使用这种布局方式 -->
        <el-row type="flex" justify="space-between">
            <div>
                <!--按钮  -->
                 <el-row>
                    <el-button type="primary" round @click='handelAddGood'>新增</el-button>
                    <el-button type="info" round @click='handelDeleteMore'>删除</el-button>
                    <!-- <el-button type="danger" round>删除</el-button> -->
                 </el-row>
            </div>
            <!-- 搜索框 -->
            <div>
                <el-input placeholder="请输入内容" 
                v-model="input3" 
                class="input-with-select">
                    <el-button 
                        slot="append" icon="el-icon-search" 
                        @click='handelSearch'>
                    </el-button>
                </el-input>
            </div>
        </el-row>
         
         <!-- 列表内容 -->
          <!-- :data="tableData":定义数据从tableData中获取 -->
          <!--  tooltip-effect：工具栏的效果（高亮或者黑暗）-->
          <!-- @selection-change：复选框被选中的时候触发这里的事件 -->
    <div class="liebiao">
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="标题"
                width="300">
                <!-- 自定义模板 -->
                <!-- slot-scope是element内置的一个方法，可以指定一个名称，
                然后通过 scope.row.date获取data的值 -->
                <!-- scope.row每一项数据的对象 -->
                <template slot-scope="scope">
                    <el-row type="flex" align='middle'>
                        <img :src="scope.row.imgurl" class="imgssssss">
                        <div class="hahahahah">
                            {{scope.row.title}}
                        </div>
                    </el-row>
                </template>
            </el-table-column>
            <!-- 显示数据的简写方式 -->
            <!-- 指定prop属性可以自动读取每一项prop值的数据 -->
            <el-table-column
                prop="categoryname"
                label="类型"
                width="120">
            </el-table-column>
            <el-table-column
                prop="sell_price"
                label="价格"
                show-overflow-tooltip>
            </el-table-column>
            <!-- 操作的两个按钮 -->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit( scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete( scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页功能 -->
        <!-- size-change ：显示条数切换-->
        <!-- current-change ：页数切换-->
        <!-- current-page：当前页面 -->
        <!-- total:数据总条数 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
    </div>
    </div>
   
</template>

<script>
import { stat } from 'fs';
export default {
    data(){
        return {
            input3:'',
            tableData: [
        ], 
        //设置分页默认样式
        pageIndex:1,//当前页面
        total:'',//总的数据条数
        pageSize:5,//页面显示条数
        selectGoods:[]
        }
    },
      methods: {
        //封装一个请求列表数据的函数
    
        // 获取页面数据
        getPageData(canshu){
                 this.$axios({
                url:` http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${canshu}`,
                method:'GET',
            }).then( res => {
                console.log(res.data);
                this.tableData=res.data.message
                this.total=res.data.totalcount
            })

            },
             toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //当选中复选框的时候触发这个事件，现用于储存id
      handleSelectionChange(val) {
          
        this.selectGoods = val;

      },
      //删除多个商品
      handelDeleteMore(){
          var arr=this.selectGoods.map( v => {
            return  v.id
          })
        //   console.log(this.ids);
        const ids=arr.join(',')
        this.$axios({
            url:`http://localhost:8899/admin/goods/del/${ids}`,
            method:'GET',
            
        }).then(res => {
            const {message,status} =res.data
            if (status===0){
                this.$message.success(message)
                //删除成功后重新请求页面
                this.getPageData('')
            }else{
                this.message.error(message)
            }
        })
      },


      handleEdit(goods) {
        // console.log(index, row);
        // console.log(goods);
        this.$router.push('/admin/goods-edit/'+goods.id)
      },
      //删除单个商品
      handleDelete(index, row) {
        console.log(index);
        const id=index.id
        this.$axios({
            url:`http://localhost:8899/admin/goods/del/${id}`,
            method:'GET'
        }).then(res=>{
            const {message,status} =res.data
            if (status===0){
                this.$message.success(message)
                //删除成功后刷新页面
                this.getPageData('')
            } else{
                this.$message.error(message)
            }
        })
      },
      //页面显示条数
      handleSizeChange(val) {
          this.pageSize=val
          this.getPageData('')
        // console.log(`每页 ${val} 条`);
      },
      //当前页面切换的时候触发
      handleCurrentChange(val) {
          this.pageIndex=val
          this.getPageData('')
        // console.log(`当前页: ${val}`);
      },
      //搜索框
      handelSearch(){
          this.getPageData(this.input3)
      },
      //给新增按钮设置一个跳转
      handelAddGood(){
          this.$router.push('/admin/goods-add')
      }
    },
        mounted(){
          this.getPageData('')
      },
     
      
    }

</script>

<style>
.liebiao{
    margin-top: 10px;
}
.imgssssss{
    width: 60px;
    height: 60px;
    flex-shrink: 0;
}

</style>
