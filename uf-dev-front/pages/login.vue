<template>
  <div class="form_page">
    <form @submit.prevent="submitLogin">
      <div class="form-field_container">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="userCredentials.email" required>
      </div>
      <div class="form-field_container">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="userCredentials.password" required>
      </div>
      <button class="" type="submit">Login</button>
      <NuxtLink to="/register">You don't have an account? Register here</NuxtLink>
      <span class="error-message">{{ errorMessage }}</span>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const token = useCookie(
  'token',
  {
    default: () => "",
    watch: 'shallow'
  }
)

const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const userCredentials = ref({
  email: '',
  password: ''
})

const errorMessage = ref('')

const submitLogin = async () => {
  if (!checkFields()) return
  const loginResponse = await loginUser(runtimeConfig.public.API_ENDPOINT, userCredentials.value);
  if (loginResponse.data && !loginResponse.error) {
    token.value = loginResponse.data.value.accessToken
    await router.push('/');
  } else {
    errorMessage.value = "Incorrect credentials";
  }
}

const checkFields = () => {
  console.log("checking fields")
  if(userCredentials.value.email === '' && userCredentials.value.password === '') {
    errorManager('At least one field is empty')
    return false;
  } else {
    return true;
  }

}

const errorManager = (error) => {
  console.log(error)
  errorMessage.value = error;
  setTimeout(() => {
    errorMessage.value = ''
  }, 5000);
}

</script>

<style lang="scss">
.form_page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 30%;
    @media only screen and (max-width : 650px) {
      width: 85%;
    }

    .form-field_container {
      display: flex;
      flex-direction: column;
      gap: 5px;
      input {
        border: none;
        padding: 10px 15px;
        border-radius: 3px;
      }
    }

    .error-message {
      color: #ba0b31;
    }

    button {
      margin-top: 10px;
      padding: 10px 15px;
      border: none;
      background-color: #437ce6;
      transition: ease .4s;
      border-radius: 3px;
      color: white;
      text-transform: uppercase;
      font-weight: bold;
      &:hover {
        background-color: #2b59ad;
      }
    }
  }
}
</style>