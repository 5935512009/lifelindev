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

     
         <div class="col-span-9">
            <Friendlist/></div>
           
        
    </div>

    <router-view />
  </div>
</template>

<script>
import firebase from "../firebaseConfig";
import Friendlist from "../components/Friend_list"
const db = firebase.firestore();
export default {
  name: "manu_contacts",
  components:{
        Friendlist,

    },
  data() {
    return {
      name: "",
      date: new Date().toISOString().slice(0, 10),
      employeesData: [],
      search: "",
      message: "",
    };
  },
  methods: {
    createEmployee(name, date) {
      if (name != "") {
        db.collection("employees")
          .add({ date: date, name: name })
          .then(() => {
            console.log("Document successfully written!");
            this.readEmployees();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        this.name = "";
      }
    },
    readEmployees() {
      this.employeesData = [];
      db.collection("employees")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.employeesData.push({
              id: doc.id,
              name: doc.data().name,
              date: doc.data().date,
            });
            console.log(doc.id, " => ", doc.data());
          });
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
          this.readEmployees();
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteEmployee(id) {
      db.collection("employees")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.readEmployees();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        });
    },
  },
  mounted() {
    this.readEmployees();
  },

  // beforeCreate() {   // กันคนเข้า ***
  //   firebase.auth().onAuthStateChanged((user) => {
  //       if (!user) {
  //         this.$router.replace("/loginpage")
  //       }
  //   });
  // },

  //   updated() {
  //     var what = firebase.auth().currentUser;
  // console.log('User', what)
  //   },
};
</script>

<style scoped>
button {
  color: white;
  padding: 10px 25px;
  border: 1px solid #fff;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  text-align: center;
}
</style>