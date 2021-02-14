<template>
  <div class="col-span-9">
        
        {{this.search}}
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
            >Friend_UID</el-button
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
          class="scrolling"
        >
          <el-table-column label="Date" prop="date"> </el-table-column>   
          <el-table-column label="Name" prop="name"> </el-table-column>
          <el-table-column align="right">
            <!-- <template slot="header" :slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="Type to search"
              />
            </template> -->
            <template slot-scope="scope" >
                <div> 
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
              ></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
</template>

<script>
import firebase from "../firebaseConfig";
const db = firebase.firestore();
export default {
    name:"Friendlist",
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
  
}
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
.scrolling {
    height: 600px;
    overflow: auto;
}

</style>