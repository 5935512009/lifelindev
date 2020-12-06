<template>
  <div id="app">
    <div id="nav">
      <div class="grid grid-cols-12">
      <div id="main" class="text-white text-3xl text-center border-solid border-0 border-red-400 col-span-1 xl:col-span-2 ">
          <router-link to="/">LifelineDEV</router-link>        
        </div>
          <router-link to="/" class="text-white text-center col-span-1 col-start-8 flex justify-center items-center">
            <div class="flex justify-center items-center">HOME</div>
            </router-link>
            <router-link to="/About" class="text-white text-center col-span-1 col-start-9 flex justify-center items-center">
            <div class="flex justify-center items-center">ABOUT</div>
            </router-link>
            <router-link to="/weare" class="text-white text-center col-span-1 col-start-10 flex justify-center items-center">
            <div class="flex justify-center items-center">BLOG</div>
            </router-link>
            <router-link to="/services" class="text-white text-center col-span-1 col-start-11 flex justify-center items-center">
            <div class="flex justify-center items-center">SERVICES</div>
            </router-link>
            <router-link to="/contact" class="text-white text-center col-span-1 col-start-12 flex justify-center items-center">
            <div class="flex justify-center items-center">CONTACT</div>
            </router-link>

          <div class="grid-flow-row-2">
          
      </div>
    </div>
    <router-view/>
      
    </div>
  </div>
</template>
<script>
import firebase from "./firebaseConfig";
const db = firebase.firestore();
export default {
  methods: {
    createEmployee(name, date) {
        db.collection("employees")
          .add({ date: date, name: name })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
    },
    readEmployees() {
      let employeesData = [];
      db.collection("employees")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
           employeesData.push({
              id: doc.id,
              name: doc.data().name,
              date: doc.data().date,
            });
            console.log(doc.id, " => ", doc.data());
          });
          return employeesData
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    updateEmployee(id, name, date) {
      db.collection("employees")
        .doc(id)
        .update({
          name: name,
          date: date,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    },
    deleteEmployee(id) {
      db.collection("employees")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  },
}
</script>

<style scoped>
#app {
 /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;*/
  background-image: url('./assets/landsc.jpg');
  background-size:cover;
  background-position: bottom; 
  transition: 0.4s;
  height: 100vh;
}

main{
  height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  
}

#nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
}
</style>
