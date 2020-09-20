<template>
  <div class="hello">
    <div id="welcome" >
          <div class="text-center text-white text-4xl font-bold">  WELCOME TO LifelineDEV </div>
         <small id="meet" class="text-white text-1xl">this page make easy meeting</small>      
    </div>

    
     <div  id="get" class="text-center "><router-link to="loginpage"> <button type="button"> GET STARTED</button></router-link> </div>
   

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button{
  color:white;
  padding: 10px 25px;
  border: 1px solid #fff;
  border-radius: 20px;
  outline: none;
  cursor: pointer; 
}
#welcome {
  position: absolute;
  top: 40%;
  left: 40%;
  transform: translateY(-50%);
  z-index: 2; 
}
#get{
  position: absolute;
  top: 46%;
  left: 48%;
}

</style>
