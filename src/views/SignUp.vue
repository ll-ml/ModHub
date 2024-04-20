<template>
<div class="container text-center my-4 py-4">
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
    <div class="container-fluid">
    <form>
        <img class="mb-4" src="../assets/static_images/zyyta_default_home.png" alt="zyyta" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal zyyta-logo-font">Create a ModHub Account</h1>

        <div class="form-floating">
        <input v-model="email" type="email" class="form-control" placeholder="email@domain.com">
        <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating my-4">
        <input v-model="username" type="text" class="form-control" placeholder="username">
        <label for="floatingInput">@Username</label>
        </div>
        <div class="form-floating my-4">
        <input v-model="password" type="password" class="form-control"  placeholder="Password">
        <label for="floatingPassword">Password</label>
        </div>
        <button @click.prevent="register" class="my-3 btn btn-lg btn-outline-primary">Create Account</button>
    </form>
    </div>
    <notification-alert v-if="errorMessage" :message="errorMessage"></notification-alert>
</main>
  </body>
</div>
</template>

<script>
import NotificationAlert from '@/components/Notifications/NotificationAlert.vue'
import { useUserStore } from '@/store/user';
import { ref } from 'vue';

export default {
  components: {
    NotificationAlert
  },
  setup() {
    const uStore = useUserStore(); 
    return { uStore }
    
  },
    created() {
        document.title = 'Zyyta.com | Create Account';
    },
    data() {
        return {
          errorMessage: "",
          username: ref(''),
          email: ref(''),
          password: ref(''),
        }
    },
    methods: {
      async register() {
        await this.uStore.signUp(this.username, this.email, this.password);
        if(this.uStore.getUser) {
          this.errorMessage = "";
        }else {
          this.errorMessage = "Error could not create account.";
        }
      }
    }
}
</script>

<style>
 .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

      .b-example-divider {
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }

</style>