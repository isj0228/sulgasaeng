<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-12">
                <div class="p-5">
                  <div class="text-center">
                    <h2 class="h4 text-gray-900 mb-4">Edit Profile</h2>
                  </div>
                  <div class="profile-info text-center mb-4">
                    <!-- 이미지 관련 코드 -->
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
                        <li v-for="(link, index) in links" :key="link.id" class="mb-2">
                          <input v-model="link.url" type="text" class="form-control form-control-user mb-2" :placeholder="index === links.length - 1 ? 'Newly added' : ''">
                          <button v-if="index === links.length - 1" type="button" class="btn btn-primary btn-circle mr-2" @click="addURL" title="Add Another">
                            <i class="fas fa-plus"></i>
                          </button>
                          <button v-if="index > 0" type="button" class="btn btn-danger btn-circle" @click="removeURL(index)" title="Remove">
                            <i class="fas fa-minus"></i>
                          </button>
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
      profilePhoto: "/img/undraw_profile_1.svg", //초기 프로필
      username: "",
      email: "",
      bio: "",
      links: [
        { id: 1, url: "https://example.com" }
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
      this.saveMessage = true;
      
      setTimeout(() => {
        this.saveMessage = false;
      }, 3000);
    },
    addURL() {
      this.links.push({ id: Date.now(), url: "" });
    },
    removeURL(index) {
      if (this.links.length > 1) {
        this.links.splice(index, 1);
      }
    }
  }
}
</script>

<style>
.profile-info {
  display: flex; 
  align-items: center; 
  justify-content: center;
}
</style>