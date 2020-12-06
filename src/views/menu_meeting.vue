<template>
  <div id="weare">
      <div class="grid grid-cols-12 h-full">
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
          <v-btn color="primary" dark @click.stop="dialog = true">
            New Event
          </v-btn>



            <div>meeting</div>
            <div>Event  and Method</div>

            <button @click="clickme">Test Methond</button>
            <!-- ทดลองใช้ time  -->
            <h3>{{getTimestamp()}}</h3>    
            

          </div>
          <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="event name (required)"></v-text-field>
              <v-text-field v-model="details" type="text" label="detail"></v-text-field>
              <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>
              <v-text-field v-model="end" type="date" label="end (required)"></v-text-field>
              <v-text-field v-model="color" type="color" label="color (click to open color menu)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                create event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
      </div>
      

     
     <router-view/>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "menu_meeting",
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    name: null,
    details: null,
    start: null,
    end: null,
    color: '#1976D2', // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    dialogDate: false
  }),
  
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
mounted() { 
  //  มอง mounted เป็น function จะทำงานหลังจาก 
    this.test_log()
},

  methods: {
    signout() {
       firebase
       .auth()
       .signOut()
       .then(() => {
         this.$router.replace("/");
       });
    },
    clickme(){
      alert("Hi we in menu_meeting!!!")
    },
    getTimestamp(){
      return Date()
    },
    test_log(){
      console.log("Use mounted in menu_meeting.vue 01")
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