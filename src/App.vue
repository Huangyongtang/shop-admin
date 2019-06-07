<template>
  <div id="app">
    <router-view></router-view>
    <el-button type="primary" plain>主要按钮</el-button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  // name: 'app',
  // components: {
  //   // HelloWorld
  // }
    mounted(){
     this.$axios({
         url: "https://api.github.com/users",
      method: "GET",
    }).then(res => {
      console.log(res)
     })
    }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
