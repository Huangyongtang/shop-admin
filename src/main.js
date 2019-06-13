import Vue from 'vue'
import App from './App.vue'
// 1.引入element-ui
import ElementUI from 'element-ui';
// 2.引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.config.productionTip = false

//引入路由模块
import VueRouter from "vue-router"

//引入组件
import Login from './pages/Login.vue'
import Admin from './pages/Admin.vue'
import Goodslist from './pages/Goodslist.vue'
import Categorylist from './pages/Categorylist.vue'
import GoodsAdd from './pages/GoodsAdd.vue'
import GoodsEdit from './pages/GoodsEdit.vue'

// 注册路由
Vue.use(VueRouter);
// 配置路由
const routes = [
  {path:'/',redirect:'/admin/goods-list'},
  {path: "/login", component: Login,meta:'登陆'},
  {path:'/admin',component:Admin,meta:'商品管理',children:[
    {path:'goods-list',component:Goodslist,meta:'商品列表'},
    {path:'category-list',component:Categorylist,meta:'栏目列表'},
    {path:'goods-add',component:GoodsAdd,meta:'新增商品'},
    {path:'goods-edit/:id',component:GoodsEdit,meta:'编辑商品'},
  ]},
];
// 路由实例
const router = new VueRouter({ routes });

// 路由卫士
// to:去往页面
// from：从哪个页面出发
// next:跳转到哪个页面(必不可少，里面可以带url这个参数)
router.beforeEach((to,from,next) => {
    axios({
      url:'http://localhost:8899/admin/account/islogin',
      method:'GET',
      // 处理session跨域
      withCredentials: true,
    }).then( res =>{
      // console.log(res);
      const {code}=res.data
      if(to.path==='/login'){
        if (code==="logined"){
          next('/admin/goods-list')
        }else{
          next()
        }
      }else{
        if(code==='logined'){
          next()
        }else{
          next('/login')
      }
      }
    })
})

//给Vue这个构造函数的原型添加一个属性
Vue.prototype.$axios=axios
// 3.全局注册组件
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  //挂载路由
  router,
}).$mount('#app')
