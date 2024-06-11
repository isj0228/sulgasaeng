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
                      <h6 id="image" @click="changePhoto">Change profile photo</h6>
                    </div>
                  </div>
                  <form class="user">
                    <div class="form-group">
                      <h5>Username</h5>
                      <input type="text" class="form-control form-control-user" placeholder="Enter Username">
                    </div>
                    <div class="form-group">
                      <h5>Email</h5>
                      <input type="email" class="form-control form-control-user" placeholder="Enter Email">
                    </div>
                    <div class="form-group">
                      <h5>URLs</h5>
                      <ul class="list-unstyled">
                        <li v-for="link in links" :key="link.id" class="mb-2">
                          <input type="text" class="form-control form-control-user" :placeholder="link.url">
                        </li>
                      </ul>
                    </div>
                    <div class="form-group">
                      <h5>Bio</h5>
                      <textarea rows="5" class="form-control form-control-user square-textarea" placeholder="What are you up to"></textarea>
                    </div>
                    <button class="btn btn-primary btn-user btn-block">Save Changes</button>
                  </form>
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