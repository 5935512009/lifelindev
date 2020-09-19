<template>
  <div id="about1" class="about bg-white bg-opacity-50 w-2/4 absolute">
    <form class="contact-form" @submit.prevent="sendEmail">
    <label>Name</label>
    <input type="text" name="user_name">
    <label>Email</label>
    <input type="email" name="user_email">
    <label>Message</label>
    <textarea name="message"></textarea>
    <input type="submit" value="Send">
  </form>
    
   
  </div>
  
</template>
<style >
    
</style>