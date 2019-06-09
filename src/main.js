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
import Login from './pages/Login.vue'
import Admin from './pages/Admin.vue'
// 注册路由
Vue.use(VueRouter);
// 配置路由
const routes = [
  {path:'/',component:Admin},
  {path: "/login", component: Login}
];
// 路由实例
const router = new VueRouter({ routes });

//给Vue这个构造函数的原型添加一个属性
Vue.prototype.$axios=axios
// 3.全局注册组件
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  //挂载路由
  router,
}).$mount('#app')
