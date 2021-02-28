<template>
  <div class="col-span-9">
        
        <!-- {{this.search}} -->
        <!-- <el-popover
          placement="bottom"
          title="New friend"
          width="200"
          trigger="click"
        >
          <el-input
            placeholder="email"
            v-model="name"
            @blur="createEmployee(name, date, status)"
          ></el-input>
          <el-button round slot="reference" type="success"
            >Friend_UID</el-button
          >
        </el-popover> -->
        <!-- {{this.request.length}} -->
        <el-table
          :data="
            request.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
          class="scrolling"
        >
          <el-table-column label="date" prop="date"> </el-table-column>   
          <el-table-column label="Name event" prop="name"> </el-table-column>
          <el-table-column label="start" prop="start"></el-table-column>
          <el-table-column label="end" prop="end"></el-table-column>
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
              <!-- <el-popover
                placement="bottom"
                title="Edit Employee"
                width="200"
                trigger="click"
              >
                <el-input
                  placeholder="change"
                  v-model="scope.row.name"
                  @blur="updateEmployee(scope.row.id, scope.row.name, date)"
                ></el-input>
                <el-button size="mini" slot="reference">Edit</el-button>
              </el-popover> -->
            
              
                <el-button size="mini" type="success" @click="updateStatus(scope.row, true)">
                  Yes
                </el-button>
          
              <el-button
                size="mini"
                type="danger"
                @click="updateStatus(scope.row, false)"
                >No</el-button
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
    name:"Receiver",
    data() {
    return {
      userData: [],
      request: [],
      name: "",
      date: new Date().toISOString().slice(0, 10),
      status:"",
      start:"",
      end:"",
      employeesData: [],
      search: "",
      message: "",
    };
  },
  methods: {
    async getEvents () {
      let snapshot = await db.collection('calEvent').get()
      const events = []
      snapshot.forEach(doc => {
        const docDatas = doc.data()
        const request = docDatas.email.map(item => item.name === this.userData.email)
        const checkEmail = request.includes(true)
        if (checkEmail) {
          events.push({
              id: doc.id,
              name: doc.data().name,
              date: doc.data().date,
              start: doc.data().start,
              end: doc.data().end,
              email: doc.data().email,
              details: doc.data().details,
              color: doc.data().color,
              place: doc.data().place, 
              userID: doc.data().userID, 
            })
        }
      })
       this.request = events
    },
   updateStatus(data, status){
    //  console.log('data', data)
    //  console.log('status', status)
     let emailChange = data.email
     const index = emailChange.findIndex(item => item.name === this.userData.email)
    //  console.log('index', index)
     const statusEmail = status ? 'yes' : 'no'
    //  console.log('status', statusEmail)
     emailChange[index] = {
       ...emailChange[index],
       status: statusEmail
     }
      db.collection('calEvent').doc(data.id).set({
          date:data.date,
          color:data.color,
          email:emailChange,
          place:data.place,
          name:data.name,
          details: data.details,
          start:data.start,
          end:data.end,
          userID: data.userID
        })
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
    this.userData = this.$store.getters.getUserData
    this.getEvents()
    // this.readEmployees();
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