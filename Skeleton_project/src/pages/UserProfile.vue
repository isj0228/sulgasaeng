<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-12">
                <div class="p-5">
                  <div class="text-center">
                    <h2 class="h4 text-gray-900 mb-4">Edit Profile</h2>
                  </div>
                  <div class="profile-info text-center mb-4">
                    <!-- Adjust the width and height of the image using the style attribute -->
                    <img class="rounded-circle mb-3" :src="profilePhoto" alt="Profile Photo" style="width: 100px; height: 100px;">
                    <div class="profile-details">
                      <h6>Helena Hills</h6>
                      <h6 id="image" @click="triggerFileInput">Change profile photo</h6>
                      <input type="file" ref="fileInput" @change="onFileChange" style="display: none;">
                    </div>
                  </div>
                  <form class="user" @submit.prevent="saveChanges">
                    <div class="form-group">
                      <h5>Username</h5>
                      <input v-model="username" type="text" class="form-control form-control-user" placeholder="Enter Username">
                    </div>
                    <div class="form-group">
                      <h5>Email</h5>
                      <input v-model="email" type="email" class="form-control form-control-user" placeholder="Enter Email">
                    </div>
                    <div class="form-group">
                      <h5>URLs</h5>
                      <ul class="list-unstyled">
                        <li v-for="link in links" :key="link.id" class="mb-2">
                          <input v-model="link.url" type="text" class="form-control form-control-user" placeholder="Enter URL">
                        </li>
                      </ul>
                    </div>
                    <div class="form-group">
                      <h5>Bio</h5>
                      <textarea v-model="bio" rows="5" class="form-control form-control-user square-textarea" placeholder="What are you up to"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block">Save Changes</button>
                  </form>
                  <div v-if="saveMessage" class="alert alert-success mt-4">
                    Your user profile has been saved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profilePhoto: "/img/undraw_profile_1.svg", // Initial profile photo URL
      username: "",
      email: "",
      bio: "",
      links: [
        { id: 1, url: "https://example.com" },
        { id: 2, url: "https://example.org" }
      ],
      saveMessage: false
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePhoto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveChanges() {
      // Perform any save operations here (e.g., API calls to save the data)
      
      // Show the save confirmation message
      this.saveMessage = true;
      
      // Hide the save message after 3 seconds
      setTimeout(() => {
        this.saveMessage = false;
      }, 3000);
    }
  }
};
</script>

<style>
.profile-info {
  display: flex; /* Use flexbox layout */
  align-items: center; /* Center items vertically */
  justify-content: center; /* Center items horizontally */
}

.profile-details {
  margin-left: 10px; /* Add space between image and text */
}

#image {
  color: rgba(207, 198, 198, 0.5);
  cursor: pointer; /* Change cursor to pointer to indicate clickable element */
}

/* Custom class to remove border-radius from textarea */
.square-textarea {
  border-radius: 0 !important;
}
</style>