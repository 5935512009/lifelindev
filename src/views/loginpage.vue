<template>
  <div id="hello" >
    
    <h1>{{ msg }}</h1>
    
    <div id="goo1" class="text-white bg-white bg-opacity-25 absolute text-center">
      <form @submit.prevent="pressed">
      <div class="space-y-4 space-x-6 pl-5 text-black">
        <label class="text-white">Email</label>
        <input type="email" name="user_email" placeholder="email" v-model="email">
        {{email}}
      </div>
      
      <div class=" space-y-3 space-x-6 pb-5 text-black">
        <label class="text-white">Pass</label>
        <input v-model="password" type="password" class="input" placeholder="Password">
      </div>
      <button>login</button>
      
    </form>
    <button><router-link to="/register">Register</router-link></button>
    <div class="pb-5">................................................................</div>
    
    <button @click="socialGoogleLogin">Google</button></div>
    <h2>{{this.$store.getters.getUserData}}</h2>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    socialGoogleLogin: function() {
      const provide = new firebase.auth.GoogleAuthProvider().addScope("email");
      firebase
        .auth()
        .signInWithPopup(provide)
        .then(result => {
          // create user in db
          let obj = {
            google_id: result.additionalUserInfo.profile.id,
            fullname: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            profile_image: result.additionalUserInfo.profile.picture,
            user_type_id: 1,
            uid: result.user.uid 
          };
          console.log(obj)
          this.$store.dispatch("getloginData", obj)
          this.$router.push({ name: 'menu_Scheduler' });
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    },
    handleSumbit: function() {
    },
    pressed() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          console.log(data);
          this.$router.replace({ name: "weare" });
        })
        .catch(error => {
          this.error = error;
        });
        
    }
    
  }
};



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
  color: white;
}
button{
  color:white;
  padding: 10px 25px;
  border: 1px solid #fff;
  border-radius: 20px;
  outline: none;
  cursor: pointer; 
  text-align: center;
}
goo1{
  position: absolute;
  top: 40%;
  left: 40%;
}

</style>