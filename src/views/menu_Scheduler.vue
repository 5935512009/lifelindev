<template>
  <div id="weare">
      <div class="grid grid-cols-12">
          <div class="col-span-3 bg-blue-500">
            
            <router-link to="/menu_Scheduler" class="text-white text-center col-span-1 col-start-8 flex justify-center items-center">
            <div class="flex justify-center ">Scheduler</div>
            </router-link>
            <router-link to="/menu_Profile" class="text-white text-center col-span-1 col-start-8 flex justify-center items-center">
            <div class="flex justify-center item-center">Profile</div>
            </router-link>
            <router-link to="/manu_contacts" class="text-white text-center col-span-1 col-start-8 flex justify-center items-center">
            <div class="flex justify-center item-center">friends list </div>
            </router-link>
            <router-link to="/menu_meeting" class="text-white text-center col-span-1 col-start-8 flex justify-center items-center">
            <div class="flex justify-center item-center">build meeting</div>
            </router-link>
           

  <div class="logout text-center">
       
       <button @click="signout" type="submit" class="btn text-white ">signout</button>
     </div>



          </div>
          <div class="col-span-9 bg-purple-600">
            เลขที่ 1
          </div>
      </div>
      

     
     <router-view/>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "menu_Scheduler",
  // beforeCreate() {   // กันคนเข้า ส่วนที่กำหนดให้คนที่ login เท่านั้นสามารถเข้าได้***
  //   firebase.auth().onAuthStateChanged((user) => {
  //       if (!user) {
  //         this.$router.replace("/loginpage")
  //          alert("You don't have a permission")
  //       }
  //   });
  // },



//   updated() {
//     var what = firebase.auth().currentUser;
// console.log('User', what)
//   },

  methods: {
    signout() {
       firebase
       .auth()
       .signOut()
       .then(() => {
         this.$router.replace("/");
       });
    }
  }
};

</script>

<style>
button{
  color:white;
  padding: 10px 25px;
  border: 1px solid #fff;
  border-radius: 20px;
  outline: none;
  cursor: pointer; 
  text-align: center;
  
}
</style>