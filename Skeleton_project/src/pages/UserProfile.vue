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
                    <h2 class="h4 text-gray-900 mb-4">프로필 수정</h2>
                  </div>
                  <form class="user" @submit.prevent="updateHandler">
                    <div class="profile-info mb-4">
                      <img @click="triggerFileInput" :src="imageInput" class="profile-photo rounded-circle mb-3" alt="Profile Photo"
                        style="width: 100px; height: 100px;">
                      <input type="file" ref="fileInput" @change="onFileChange" style="display: none;">
                    </div>
                    <div class="form-group">
                      <label for="nameInput" class="form-label">Username</label>
                      <input ref="nameInput" id="nameInput" :value="userInfo.name" type="text"
                        class="form-control form-control-user">
                    </div>
                    <div class="form-group">
                      <label for="emailInput" class="form-label">Useremail</label>
                      <input ref="emailInput" id="emailInput" :value="userInfo.email" type="email"
                        class="form-control form-control-user">
                    </div>
                    <div class="form-group">
                      <label for="phoneInput" class="form-label">Userphone</label>
                      <input ref="phoneInput" id="phoneInput" :value="userInfo.phone" type="phone"
                        class="form-control form-control-user">
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block">Save Changes</button>
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

<script setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/userStore.js'

const userInfo = computed(() => useUserStore().userInfo);
const { updateUser } = useUserStore();
// 상태 정의
const defaultImg = userInfo.value.image;
const imageInput = ref(defaultImg);
const fileInput = ref(null);
const nameInput = ref(null);
const emailInput = ref(null);
const phoneInput = ref(null);

const updateHandler = () => {
  const inputValues = {
    name: nameInput.value.value,
    email: emailInput.value.value,
    phone: phoneInput.value.value,
    image: imageInput.value
  };

  let { name, email, phone, image } = inputValues;
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
  updateUser({ ...inputValues }, () => {
    alert('변경이 완료되었습니다.')
  });
}

// 메서드 정의
const triggerFileInput = () => {
  fileInput.value.click();
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    
    const reader = new FileReader();
    reader.onload = (e) => {
      imageInput.value = `/img/${file.name}`;
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

</style>