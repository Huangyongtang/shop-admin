<template>
    <div class="mianbao">
        <el-breadcrumb separator="/">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">商品列表</el-breadcrumb-item> -->
           <el-breadcrumb-item  v-for='(item,index) in info' :key='index'>
               {{item}}
           </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data(){
        return {
            info:[],
        }
    },
    mounted(){
        this.getList()
    },
    watch:{
        $route(){
            this.getList()
        }
    },
    methods:{
        getList(){
            // console.log(this.$route);
            const info=[]
            this.$route.matched.forEach(v=>{
                info.push(v.meta)
            })
            this.info=info
        }
    }
}
</script>

<style>
.mianbao{
    padding-bottom: 10px;
    border-bottom: 1px #ddd solid;
    margin-bottom: 8px;
}
</style>
