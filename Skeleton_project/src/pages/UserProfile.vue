<template>
    <div>
      <h2>Edit Profile</h2>
      <div class="profile-info">
        <!-- Adjust the width and height of the image using the style attribute -->
        <img class="rounded-circle" :src="profilePhoto" alt="Profile Photo" style="width:100px; height:100px">
        <div class="profile-details">
          <h6>Helena Hills</h6>
          <h6 id="image" @click="changePhoto">Change profile photo</h6>
        </div>
      </div>
      <h5>Username</h5>
      <input type="text" name="Enter Username">
      <br/>
      <h5>Email</h5>
      <input type="email" name="Enter Email">
      <br/>
      <h5>URLs</h5>
      <ul>
        <li v-for="link in links" :key="link.id">
            
          {{ link.url }}
          <input type="text" name="Enter URL">
        </li>
      </ul>
      <h5>Bio</h5>
      <textarea rows="10" cols="50" name="What are you up to"></textarea> <!-- Corrected indentation here -->
      <br/> 
      <button class="btn btn-dark">Save Changes</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        profilePhoto: "/img/undraw_profile_1.svg", // Initial profile photo URL
        links: [
          { id: 1, url: "https://example.com" },
          { id: 2, url: "https://example.org" }
        ]
      };
    },
    methods: {
      changePhoto() {
        // Implement logic to change the profile photo here
        // For demonstration, let's simply change the photo to another image
        this.profilePhoto = "/img/another_profile_photo.svg";
      }
    }
  };
  </script>
  
  <style>
  .profile-info {
    display: flex; /* Use flexbox layout */
    align-items: center; /* Center items vertically */
  }
  
  .profile-details {
    margin-left: 10px; /* Add space between image and text */
  }
  
  #image {
    color: rgba(207, 198, 198, 0.5);
    cursor: pointer; /* Change cursor to pointer to indicate clickable element */
  }
  </style>