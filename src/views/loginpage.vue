<template>
  <div id="hello" >
    
    <h1>{{ msg }}</h1>
    <div id="goo1" class="text-white bg-white bg-opacity-25 absolute text-center">
      
      <div class="space-y-4 space-x-6 pl-5"><label>ID</label>
    <input type="email" name="user_email"></div>
      
      <div class=" space-y-3 space-x-6 pb-5"> <label>Pass</label>
    <input type="text" ></div>
    <button>login</button>
    <div class="pb-5">................................................................</div>

    <button @click="socialGoogleLogin">Google</button></div>
    
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
            user_type_id: 1
          };
          console.log(obj);
        })
        .catch(err => {
          alert("Oops. " + err.message);
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
  color: #42b983;
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