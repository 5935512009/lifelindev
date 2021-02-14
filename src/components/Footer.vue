<template>
  <div>
      <span :style="{color}">{{title}}</span>
      <span>{{number}}</span>

  </div>
</template>

<script>
export default {
    name:"Footer",
    props:[
        "title",
        "number",
        "color",
    ]
}
</script>

<style scoped>
.footer{
    font-size:14+px;
}
</style>