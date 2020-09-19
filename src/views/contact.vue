<template>
  <div id="about1" class="bg-white bg-opacity-50  absolute ">

    <div class="text-3xl">Contact Us</div>
    <form class="contact-form" @submit.prevent="sendEmail">
    
    <div class=" space-y-6 space-x-2"> <label>Name</label>
    <input type="text" name="user_name"></div>

    <div class="space-y-6 space-x-2"><label>Email</label>
    <input type="email" name="user_email"></div>

    <div class="space-y-6 space-x-2"> <label>Message</label>
    <textarea name="message"></textarea>
    <div class="text-center ">
    <input type="submit" value="Send"></div></div>

  </form>
    
   
  </div>
  
</template>
<style >
#about1{
  height:auto ;
  width: 400px;
  text-align: center;
  top: 30%;
  right: 37%;
  

}

</style>