<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="所属类型">
                <el-select 
                v-model="form.category_id" 
                placeholder="请选择所属类型"
                >
                <el-option
                v-for='(item,index) in categorys' :key='index'
                :label='item.title' :value="item.category_id"></el-option>
                </el-select>
            </el-form-item>
     
        <el-form-item label="是否发布">
            <el-switch v-model="form.status"></el-switch>
        </el-form-item>

        <el-form-item label="推荐类型">
            <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
            <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
        </el-form-item>

        <el-form-item label="内容标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
            <el-input v-model="form.sub_title"></el-input>
        </el-form-item>

        <el-form-item label="封面图片">
            <el-upload
                class="avatar-uploader"
                action="http://localhost:8899/admin/article/uploadimg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <!-- 图片预览 -->
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <!-- 加号图标 -->
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>

        <el-form-item label="商品货号">
            <el-input v-model="form.goods_no"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
            <el-input v-model="form.stock_quantity"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
            <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="销售价格">
            <el-input v-model="form.sell_price"></el-input>
        </el-form-item>

        <!-- 多张图片上传 -->
        <!-- action:上传的地址 -->
        <el-form-item label="图片相册">
        <el-upload
            action="http://localhost:8899/admin/article/uploadimg"
            list-type="picture-card"
            :on-success="handleUploadPicture"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <!-- dialog:弹窗 -->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        </el-form-item>

        <el-form-item label="内容摘要">
            <el-input type="textarea" v-model="form.zhaiyao"></el-input>
        </el-form-item>
        <el-form-item label="内容描述">
        <quillEditor v-model="form.content" ></quillEditor>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
    // 注册富文本插件
    components: {
    quillEditor
  },
      data() {
      return {
        //   
        form: {
          category_id:'',
          status: false,
          is_top: false,
          is_hot:false,
          zhaiyao: '',
          title:'',
          sub_title:'',
          stock_quantity:'',
          market_price:'',
          sell_price:'',
          imgList:[],
          fileList:[],
          goods_no:'',
          content:'',

        // 不属于商品添加的
        is_slide:false,
        },
        // 分页数据
        categorys:[],
        // 上传封面图片
        imageUrl: '', 
        // 上传多张图片
        dialogImageUrl: '',//多张图片的地址
        dialogVisible: false,//弹窗是否显示
      }
    },
    methods: {
    
    // 上传封面图片
      handleAvatarSuccess(res, file) {
        //   console.log(res);
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.imgList= [res]
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
      },
    // 上传多张图片
    // 删除图片执行的函数
    handleRemove(file, fileList) {
        // console.log(file, fileList);
        const arr=fileList.map(v =>{
              return v.response
          })
          this.form.fileList=arr
      },
      //上传成功后预览图片的函数
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleUploadPicture(res,file,fileList){
          console.log(fileList);
          const arr=fileList.map(v =>{
              return v.response
          })
          this.form.fileList=arr
      },
      // 立即创建
      onSubmit() {
        // console.log('submit!');
        this.$axios({
            url:' http://localhost:8899/admin/goods/add/goods',
            method:'POST',
            data:this.form,
            // 处理session跨域
                withCredentials: true,
        }).then( res =>{
            const {status,message}= res.data
            if (status===0){
                this.$message.success(message)
                this.$router.back()
            }else{
                this.$message.error(message)
            }
        })

      },
    
    },
     // 页面加载完成显示出分页类型信息
        mounted(){
            this.$axios({
                // url:'http://localhost:8899/admin/category/getlist/goods',
                url:'http://localhost:8899/admin/category/getlist/goods',
                method:'GET',

            }).then(res => {
                // console.log(res.data);
                // const {status,message}=res.data
                this.categorys=res.data.message
            })
        }
    }
    

</script>
     
<style>
/* 上传图片的css */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
