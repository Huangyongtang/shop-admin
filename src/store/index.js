import Vue from 'vue'
import Vuex from 'vuex'

// 注册仓库
Vue.use(Vuex)

// 使用Vuex.Store创建实例对象
const store =new Vuex.Store({
    state:{
        user:JSON.parse(localStorage.getItem('user')) || {}
    },
    // 设置仓库的方法
    // state是指向上面的数据
    // state是默认的参数
    mutations:{
        setUser(state,data){
            state.user=data
            window.localStorage.setItem('user',JSON.stringify(data))
        }
        
    }
})

export default store