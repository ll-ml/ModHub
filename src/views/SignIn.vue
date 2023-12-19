<template>
<div class="container text-center my-4 py-4">
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
    <form>
        <img class="mb-4" src="../assets/static_images/zyyta_default_home.png" alt="zyyta" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal zyyta-logo-font">Sign In</h1>

        <div class="form-floating">
        <input v-model="username" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email or Username</label>
        </div>

        <div class="form-floating my-4">
        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
        </div>
        <button @click.prevent="login" class="my-3 mx-3 btn btn-lg btn-outline-primary" >Sign in</button>
        <router-view>
          <router-link to="/signup" custom v-slot="{ navigate }">
            <a class="my-3 btn btn-lg btn-outline-primary" @click="navigate" role="button">Sign up</a>
          </router-link>
        </router-view>
    </form>
    <notifications-alert v-if="invalid" :message="invalidText"></notifications-alert>
    <footer>
      <p class="mt-5 mb-3 text-muted zyyta-logo-font"><i class="bi bi-c-circle"></i> Zyyta.com 2023</p>
    </footer>
  </main>
  </body>
</div>
</template>

<script>
import { useUserStore } from '@/store/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import NotificationsAlert from '@/components/Notifications/NotificationAlert.vue';

export default {
  components: {
    NotificationsAlert,
  },
  setup() {
    const uStore = useUserStore();
    const router = useRouter();
    return { uStore, router };
  },
  created() {
    document.title = 'Auth | Zyyta.com'

  },
 data() {
    return {
      username: ref(''),
      password: ref(''),
      invalidText: "Sorry, could not log you in with provided credentials.",
      invalid: false,
    };
  },
  methods: {
    async login() {
      //this.invalid = true;
      await this.uStore.signIn(this.username, this.password);
      if(this.uStore.getUser) {
        this.router.push("/")
      }else {
        this.invalid = true;

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