<template>
  <div id="weare">
      <div class="grid grid-cols-12">
          <div class="col-span-3 bg-blue-500 flex flex-col justify-start items-center p-5">
        <router-link
          to="/menu_Scheduler"
          class="text-white"
        >
          <div class="rounded-full py-2 px-6 border text-center w-40 mb-2">Scheduler</div>
        </router-link>
        <router-link
          to="/menu_Profile"
          class="text-white"
        >
          <div class="rounded-full py-2 px-6 border text-center w-40 mb-2">Profile</div>
        </router-link>
        <router-link
          to="/manu_contacts"
          class="text-white"
        >
          <div class="rounded-full py-2 px-6 border text-center w-40 mb-2">friends list</div>
        </router-link>
        <router-link
          to="/menu_meeting"
          class="text-white"
        >
          <div class="rounded-full py-2 px-6 border text-center w-40 mb-2">build meeting</div>
        </router-link>

        <div class="logout ">
          <button @click="signout" type="submit" class="btn text-white rounded-full py-2 px-6 border text-center w-40">
            signout
          </button>
        </div>
      </div>
          <div class="col-span-9 bg-purple-600">
            welcome come to the lifeline group meeting
          </div>
      </div>
      

     
     <router-view/>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Home",
  mounted() {   // กันคนเข้า ***
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          this.$router.replace("/loginpage")
        }
    });
  },



  updated() {
    var what = firebase.auth().currentUser;
console.log('User', what)
  },

  methods: {
    signout() {
       this.$router.replace("/");
       firebase
       .auth()
       .signOut()
    }
  }
};

</script>

<style scoped>
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