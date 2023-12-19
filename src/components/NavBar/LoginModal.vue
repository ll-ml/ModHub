<template>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center zyyta-logo-font" id="exampleModalLabel">Auth</h1>
        <button type="button" id="closeModalButton" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
        <div class="container text-center my-4 py-4">
          <body class="text-center">
         <main class="form-signin w-100 m-auto">
         <form>
          <img class="mb-4" src="../../assets/static_images/zyyta_default_home.png" alt="zyyta" width="72" height="57">
            <h1 class="h3 mb-3 fw-normal zyyta-logo-font">Sign In</h1>

          <div class="form-floating">
            <input v-model="username" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Email or Username</label>
          </div>

          <div class="form-floating my-4">
            <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
          </div>
        
          <button @click.prevent="login" class="my-3 mx-3 btn btn-lg btn-outline-primary">Log In</button>
        
         </form>
         <notification-alert v-if="invalid" :message="invalidText"></notification-alert>
      </main>
  </body>
  </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import NotificationAlert from '../Notifications/NotificationAlert.vue';

export default {
    components: { NotificationAlert },
    setup() {
        const uStore = useUserStore();
        return { uStore };
    },
    created() {
    
    },
    data() {
        return {
            username: ref(''),
            password: ref(''),
            invalidText: "Sorry, could not log you in with provided credentials.",
            invalid: false,
        }
    },
    methods: {
        async login() {
            await this.uStore.signIn(this.username, this.password);

            if (this.uStore.getUser) {
                this.username = '';
                this.password = '';
                this.modalCloseOnLogin();
                this.invalid = false;
            } else {
              this.invalid = true;
            }
        },
        modalCloseOnLogin() {
            const closeButton = document.getElementById('closeModalButton');
            closeButton.click();
        }
        
    }
    
}
</script>