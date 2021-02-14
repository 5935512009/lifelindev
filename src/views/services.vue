<template>
    <div id="services" class="text-white text-3xl">
        <h1>{{$store.getters.getCount}}</h1>
        <hr>
        <br>
        <ComA/>
        <hr>
        <br>
        <Footer title="this is the way Ltd" number="02" color="red"/>

    </div>
</template>
<script>
import ComA from "../components/ComA"
import Footer from "../components/Footer"
export default {
    name:"Services",
    components:{
        ComA,
        Footer

    },
    
}
</script>