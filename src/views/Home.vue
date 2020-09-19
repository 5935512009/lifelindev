<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">  ทดลองใช้ภาพ-->
    <div class="text-white text-1xl">this image in home.vue</div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div  class="text-white ">
      <h1>test Use router in home.vue</h1>
      <div>asdasd</div>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<style >
 
</style>
