<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 62.5%;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar{
  width: 8px;
  height: 12px;
  background-color: #F5F5F5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  border-radius: 8px;
  background-color: #F5F5F5;
}

/*定义滚动条滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
  border-radius: 8px;
  background-color: #555;
}
</style>
