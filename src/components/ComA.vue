<template>
  <div id="comA">
      <h2>{{$store.getters.getCount}}</h2>
      <button @click="add01">add</button>
      <br>
      <button @click="del02"> ลด</button>
  </div>
</template>

<script>
export default {
    name: "ComA",
    methods: {
        add01(){
            this.$store.dispatch("addAction")
        },
        del02(){
            this.$store.dispatch("delAction")
        }
    },
    
}
</script>

<style>

</style>