<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn color="primary" dark @click.stop="dialog = true">
            New Event
          </v-btn>
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>  <!--ลูกศร -->
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>  <!--ลูกศร -->
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="email" type="email" label="email-Participants"></v-text-field>
              <v-text-field v-model="name" type="text" label="event name (required)"></v-text-field>
              <v-text-field v-model="details" type="text" label="detail"></v-text-field>
              <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>
              <v-text-field v-model="start_time" type="time" label="start_time (required)"></v-text-field>
              <v-text-field v-model="end" type="date" label="end (required)"></v-text-field>
              <v-text-field v-model="end_time" type="time" label="end_time (required)"></v-text-field>
              <v-text-field v-model="place" type="text" label="place"></v-text-field>
              <v-text-field v-model="color" type="color" label="color (click to open color menu)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                create event
              </v-btn>
        
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDate" max-width="500">
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

<v-sheet height="600">
  <v-calendar
  ref="calendar"
  v-model="focus"
  color="primary"
  :events="events"
  :event-color="getEventColor"
  :event-margin-bottom="3"
  :type="type"
  @click:event="showEvent"
  @click:more="viewDay"
  @click:date="setDialogDate"
  @change="updateRange"
  >
   <template v-slot:day-body="{ date, week }">
              <div
                class="v-current-time"
                :class="{ first: date === week[0].date }"
                :style="{ top: nowY }"
              ></div>
            </template>

  </v-calendar>
  <v-menu
  v-model="selectedOpen"
  :close-on-content-click="false"
  :activator="selectedElement"
  full-width
  offset-x
  >
  <v-card color="grey lighten-4" :width="400" flat>
    <v-toolbar :color="selectedEvent.color" dark>
    <div v-if="this.userData.uid === this.selectedEvent.userID">
      <v-btn @click="deleteEvent(selectedEvent.id)" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>

      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
<!-- ไม่มี buck เเต่ mark <b> ไว้ก่อน -->
    <v-card-text> 
      <form v-if="currentlyEditing !== selectedEvent.id">
      <div> <span class="text-red-600 font-black"> detail :</span> {{ selectedEvent.details }}</div>  
        
      <div> <span class="text-red-600 font-black"> place :</span> {{ selectedEvent.place}}</div> 
      <div> <span class="text-red-600 font-black"> start : </span> {{selectedEvent.start}}</div>  
      <div> <span class="text-red-600 font-black"> end : </span> {{selectedEvent.end}}</div>   
      <div class="text-red-600 font-black">Participants : </div>
      <div class="border-2 border-gray-400 rounded-md p-2">
        <div v-bind:key="item" v-for="item in selectedEvent.email">
          <div class="flex justify-between items-center ">
            <span class="">{{item.name}}</span>
            <span v-if="item.status === 'yes'" class="text-green-500"><v-icon style="color: green" >mdi-check-circle</v-icon></span>
            <span v-else-if="item.status === 'waiting'" class="text-gray-500"><v-icon style="color: #E29B2F">mdi-clock</v-icon></span>
            <span v-else-if="item.status === 'no'" class="text-red-500"><v-icon style="color: red">mdi-alpha-x-circle</v-icon></span>
            <span v-else-if="item.status === 'considered'" class="text-yellow-300">{{item.status}}</span>
          </div>
        </div>
      </div>
      </form>
      <form v-else>
        <textarea-autosize
        v-model="selectedEvent.details"
        
        type="text"
        style="width: 100%"
        :min-height="80"
        placeholder="add note">
      </textarea-autosize>
      <textarea-autosize
        v-model="selectedEvent.place"
        
        type="text"
        style="width: 100%"
        :min-height="80"
        placeholder="add note">
      </textarea-autosize>
    </form>
  </v-card-text>

  <v-card-actions>   <!--ปุ่มเเก้ไข event ใน calendar -->
    <v-btn text color="secondary" @click="selectedOpen = false">
      close
    </v-btn>
    <div v-if="this.userData.uid === this.selectedEvent.userID">
    <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent)">
      edit
    </v-btn>
    <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
      Save
    </v-btn>
    </div>
    <div v-else>
      <v-btn text  type="submit" @click.prevent="updateStatus(selectedEvent)">
      cancel
    </v-btn>
    </div>
  </v-card-actions>
  <!-- {{this.userData.email}} -->
  <!-- {{this.selectedEvent}} -->
</v-card>
</v-menu>
</v-sheet>
</v-col>
</v-row>
</template>

<script>
import { db } from "../firebaseConfig";
export default {
  
  data: () => ({
    userData: {},
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'week',
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
    dialogDate: false,
    value: '',
    ready: false,
    start_time:'',
    end_time:'',
    place:'',
    email:'',
    status:'',
  }),
  mounted () {
    this.userData = this.$store.getters.getUserData
    this.getEvents()
    this.ready = true
    this.scrollToTime()
    this.updateTime()
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
        return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
        return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    },
    cal () {
      return this.ready ? this.$refs.calendar : null
    },
    nowY () {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
    },
  },
  methods: {
    async getEvents () {
      let snapshot = await db.collection('calEvent').where("member", "array-contains", this.userData.uid || '').get()
      const events = []
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        events.push(appData)
      })
      this.events = events
    },
    setDialogDate( { date }) {
      this.dialogDate = true
      this.focus = date
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    setTime (day, time) {
      if (time) {
        return day + ' ' + time
      } else {
        return day
      }
    },
    appendLeadingZeroes(n){
      if(n <= 9){
        return "0" + n;
      }
      return n
    },
    async addEvent () {
      const nowDate = new Date()
      const formatDate = nowDate.getFullYear() + "-" + this.appendLeadingZeroes(nowDate.getMonth() + 1) + "-" + this.appendLeadingZeroes(nowDate.getDate())
      if (this.name && this.start && this.end) {
        const requestBody = {
          member: [this.userData.uid],
          date: formatDate,
          name: this.name,
          details: this.details,
          start: this.setTime(this.start, this.start_time),
          end: this.setTime(this.end, this.end_time),
          color: this.color,
          userID: this.userData.uid,
          place: this.place,
          email: this.email.split(",").map(function(item) {
            return {
              name: item,
              
              status: 'waiting'
            }
          })
        }
        // console.log('requestBody', requestBody)
        await db.collection("calEvent").add(requestBody)
        // .then((docRef) => {
        //   console.log("Document written with ID: ", docRef.id);
        //   const confirmBody = {
        //   date: new Date(),
        //   name: this.name,
        //   start: this.start,
        //   end:this.end,
        //   eventA: '/calEvent/' + docRef.id
        // }
        // console.log(confirmBody)
        // })
        // .catch((error) => {
        //   console.error("Error adding document: ", error);
        // });
        
        this.getEvents()
        this.name = ''
        this.details = ''
        this.start = ''
        this.start_time = ''
        this.end = ''
        this.end_time = ''
        this.color = ''
        this.place = ''
        this.email = []        
        
      } else {
        alert('You must enter event name, start, and end time')
      }
    },
    async updateStatus(data){
      
     let emailChange = data.email
     const index = emailChange.findIndex(item => item.name === this.userData.email)
     emailChange[index] = {
       ...emailChange[index],
       status: 'no'
     }
     await db.collection('calEvent').doc(data.id).set({
          ...data,
          email:emailChange,
          member: this.updateMember(data.member)
        })
        this.getEvents()

   },
    updateMember(memberId){
      
      const index1 = memberId.findIndex(item => item === this.userData.uid)
      
      if(index1 === -1){
          return memberId
      } else{
        memberId.splice(index1,1)
          return memberId
      }

    },
    editEvent (ev) {
      this.currentlyEditing = ev.id
    },
    async updateEvent (ev) {
      await db.collection('calEvent').doc(this.currentlyEditing).update({
        details: ev.details,
        place: ev.place
      })
      this.selectedOpen = false
      this.currentlyEditing = null
    },
    async deleteEvent (ev) {
      await db.collection("calEvent").doc(ev).delete()
      this.selectedOpen = false
      this.getEvents()
    },


    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
      
        setTimeout(() => this.selectedOpen = true, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    getCurrentTime () {
      return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
    },
    scrollToTime () {
      const time = this.getCurrentTime()
      const first = Math.max(0, time - (time % 30) - 30)

      this.cal.scrollToTime(first)
    },
    updateTime () {
      setInterval(() => this.cal.updateTimes(), 60 * 1000)
    },
  }
}
</script>
<style scoped lang="scss">
 .v-current-time {
    height: 2px;
    background-color: #ea4335;
    position: absolute;
    left: -1px;
    right: 0;
    pointer-events: none;
    &.first::before {
      content: '';
      position: absolute;
      background-color: #ea4335;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-top: -5px;
      margin-left: -6.5px;
    }
}
</style>