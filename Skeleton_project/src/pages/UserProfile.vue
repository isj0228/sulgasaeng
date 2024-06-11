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
                  <div class="profile-info mb-4">
                    <!-- 이미지 관련 코드 -->
                    <img class="profile-photo rounded-circle mb-3" :src="userInfo.image" alt="Profile Photo"
                      style="width: 100px; height: 100px;" @click="triggerFileInput">
                    <input type="file" ref="fileInput" @change="onFileChange" style="display: none;">
                    <!-- <div class="profile-details">
                      <h6>{{userInfo.name}}</h6>
                      <h6 id="image" @click="triggerFileInput">Change profile photo</h6>
                      <input type="file" ref="fileInput" @change="onFileChange" style="display: none;">
                    </div> -->
                  </div>
                  <form class="user" @submit.prevent="updateHandler">
                    <div class="form-group">
                      <label for="inputName" class="form-label">Username</label>
                      <input v-model="userInfo.name" type="text" class="form-control form-control-user" id="inputName">
                    </div>
                    <div class="form-group">
                      <label for="inputEmail" class="form-label">Useremail</label>
                      <input v-model="userInfo.email" type="email" class="form-control form-control-user"
                        id="inputEmail">
                    </div>
                    <div class="form-group">
                      <label for="inputPhone" class="form-label">Userphone</label>
                      <input v-model="userInfo.phone" type="phone" class="form-control form-control-user"
                        id="inputPhone">
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block">Save Changes</button>
                  </form>
                  <!-- <div v-if="saveMessage" class="alert alert-success mt-4">
                    Your user profile has been saved
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useBudgetStore } from '@/stores/UserStore.js'

export default {
  data() {
    return {
      profilePhoto: "/img/undraw_profile.svg", //초기 프로필
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

</script> -->

<script setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/userStore.js'

// const userStore = useUserStore();
const userInfo = computed(() => useUserStore().userInfo);
const { updateUser } = useUserStore();

const updateHandler = () => {
  let { name, email, phone, image } = userInfo.value;
  if (!name || name.trim() === "") {
    alert('이름은 반드시 입력해야 합니다');
    return;
  } else if (!email || email.trim() === "") {
    alert('이메일은 반드시 입력해야 합니다');
    return;
  } else if (!phone || phone.trim() === "") {
    alert('전화번호는 반드시 입력해야 합니다');
    return;
  } else if (!image || image.trim() === "") {
    alert('사진은 반드시 입력해야 합니다');
    return;
  }
  updateUser({ name, email, phone, image }, () => {
    alert('변경이 완료되었습니다.')
  });
}

// 상태 정의
const fileInput = ref(null);

// 메서드 정의
const triggerFileInput = () => {
  fileInput.value.click();
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userInfo.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

</script>

<style>
.profile-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-photo {
  width: 100px;
  height: 100px;
  transition: box-shadow 0.3s ease; /* 부드러운 전환 효과 */
}

.profile-photo:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
}
</style>