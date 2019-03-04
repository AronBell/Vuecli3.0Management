<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'App'
  
}
</script>
<style lang="less">
html,body,#app{
 width: 100%;
 height: 100%;
}
</style>
