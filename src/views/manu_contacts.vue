<template>
  <div id="weare">
    <div class="grid grid-cols-12">
      <div class="col-span-3 bg-blue-500">
        <router-link
          to="/menu_Scheduler"
          class="text-white text-center col-span-1 col-start-8 flex justify-center items-center"
        >
          <div class="flex justify-center">Scheduler</div>
        </router-link>
        <router-link
          to="/menu_Profile"
          class="text-white text-center col-span-1 col-start-8 flex justify-center items-center"
        >
          <div class="flex justify-center item-center">Profile</div>
        </router-link>
        <router-link
          to="/manu_contacts"
          class="text-white text-center col-span-1 col-start-8 flex justify-center items-center"
        >
          <div class="flex justify-center item-center">friends list</div>
        </router-link>
        <router-link
          to="/menu_meeting"
          class="text-white text-center col-span-1 col-start-8 flex justify-center items-center"
        >
          <div class="flex justify-center item-center">build meeting</div>
        </router-link>

        <div class="logout text-center">
          <button @click="signout" type="submit" class="btn text-white">
            signout
          </button>
        </div>
      </div>
      <div class="col-span-9">
        <el-popover
          placement="bottom"
          title="New Employee"
          width="200"
          trigger="click"
        >
          <el-input
            placeholder="John Doe"
            v-model="name"
            @blur="createEmployee(name, date)"
          ></el-input>
          <el-button round slot="reference" type="success"
            >Add New Employee</el-button
          >
        </el-popover>
        <el-table
          :data="
            employeesData.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
        >
          <el-table-column label="Date" prop="date"> </el-table-column>
          <el-table-column label="Name" prop="name"> </el-table-column>
          <el-table-column align="right">
            <template slot="header" :slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="Type to search"
              />
            </template>
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                title="Edit Employee"
                width="200"
                trigger="click"
              >
                <el-input
                  placeholder="John Doe"
                  v-model="scope.row.name"
                  @blur="updateEmployee(scope.row.id, scope.row.name, date)"
                ></el-input>
                <el-button size="mini" slot="reference">Edit</el-button>
              </el-popover>
              <el-button
                size="mini"
                type="danger"
                @click="deleteEmployee(scope.row.id)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import firebase from "../firebaseConfig";
const db = firebase.firestore();
export default {
  name: "manu_contacts",
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
  //          alert("You don't have a permission")
  //       }
  //   });
  // },

  //   updated() {
  //     var what = firebase.auth().currentUser;
  // console.log('User', what)
  //   },
};
</script>

<style>
button {
  color: white;
  padding: 10px 25px;
  border: 1px solid #fff;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  text-align: center;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;*/
  background-image: url("../assets/landsc.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  height: 100vh;
}

main {
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