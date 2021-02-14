import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//ทดลอง 03
export default new Vuex.Store({
  state:{
    count:0,
    userData: {}
  },
  mutations:{
    add(state,value){ // สร้าง function ชื่อ add รับ state กับ value 
      state.count = value
      // state.count++ // กรณีไม่ใส่ value เข้า
    },
    setloginData(state, value){
      state.userData =  value
    }

  },
  getters:{
    getCount(state){ // state ส่งข้อมูลมาให้ อัตโนมัติ
      return state.count
    },
    getUserData(state){
      return state.userData
    }
  },
  actions:{ 
    addAction(context){  // ต้องอ้าง context 
      context.commit('add', this.getters.getCount+1)
    },
    delAction(context){
      context.commit('add', this.state.count-1)
    },
    getloginData(context, value){  // ต้องอ้าง context 
      context.commit('setloginData', value)
    }, 
  },
})

//(ปัจจับัน 2)
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })
// store.commit('increment')

// console.log('test', store.state.count)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
