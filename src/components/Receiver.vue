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
          <el-table-column label="status" prop="status">
            <template slot-scope="scope">
           <div v-if="scope.row.status ==='yes'">
             <v-icon style="color: green" >mdi-check-circle</v-icon>
           </div>

           <div v-if="scope.row.status ==='no'">
             <v-icon style="color: red">mdi-alpha-x-circle</v-icon>
           </div>

           <div v-if="scope.row.status ==='waiting'">
             <v-icon style="color: #E29B2F">mdi-clock-time-nine-outline</v-icon>
           </div>

       </template>
          </el-table-column>
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
import _ from 'lodash'
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
      let snapshot = await db.collection('calEvent').orderBy('start').get()
      const events = []
      snapshot.forEach(doc => {
        const docDatas = doc.data()
        console.log('docDatas', docDatas)
        const checkName = _.findIndex(docDatas.email, ['name', this.userData.email])
        console.log('checkName', checkName)
        const userStatus = checkName !== -1 ? docDatas.email[checkName].status : '-'
        console.log('userStatus', userStatus)

        // const request = docDatas.email.map(item => item.name === this.userData.email)
        // const checkEmail = request.includes(true)

        // const checkStatus = db.collection('calEvent')
         console.log('this.userData', this.userData)
        if (userStatus === 'waiting') {
          // if(checkStatus){
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
              member: doc.data().member,
              status: userStatus,
            })

// } // ปิดของ if(checkStatus) 
        }

      })
       this.request = events
    },
   async updateStatus(data, status){
     let emailChange = data.email
     const index = emailChange.findIndex(item => item.name === this.userData.email)
     const statusEmail = status ? 'yes' : 'no'
     emailChange[index] = {
       ...emailChange[index],
       status: statusEmail
     }
     await db.collection('calEvent').doc(data.id).set({
          ...data,
          email:emailChange,
          member: statusEmail === 'yes' ? data.member.concat(this.userData.uid) : data.member
        })
        this.getEvents()
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