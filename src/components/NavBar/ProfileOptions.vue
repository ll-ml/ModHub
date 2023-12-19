<template>
<div class="container-fluid px-4">
<div class="dropdown-center px-4">
  <a class="px-3 text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
   <i class="h2 bi bi-person-circle"></i>
    <a class="px-2 zyyta-logo-font outlineText">{{ username }}</a>
  </a>
  <ul class="dropdown-menu">
  <li><h6 class="dropdown-header text-center">Actions <span :class="`badge text-bg-${privBadge}`"> {{ privLevel }}</span></h6></li>
  
    <li><hr class="dropdown-divider"></li>
    <router-link :to="`/${user.username}`" custom v-slot="{ navigate }"><li><a @click="navigate" class="showCursorOnMouseOver dropdown-item text-center">My Profile</a></li></router-link>
    <div class="d-flex justify-content-center">
    <li><router-link to="/upload" custom v-slot="{ navigate }"><button type="button" @click="navigate" class="btn btn-outline-primary">Upload</button></router-link></li>
    </div>
    <router-link to="/settings" custom v-slot="{ navigate }"><li><a @click="navigate" class="dropdown-item showCursorOnMouseOver text-center">Settings</a></li></router-link>
    <li><a @click.prevent="signOut" class="dropdown-item showCursorOnMouseOver text-center text-danger">Sign Out</a></li>
    <div v-if="isAdmin">
      <router-link to="/admin-upload" custom v-slot="{ navigate }"><li><a @click="navigate" class="showCursorOnMouseOver dropdown-item text-center">Admin</a></li></router-link>
    </div>
  </ul>
</div>
</div>
</template>
<script>
import { useUserStore } from '@/store/user';

export default {
  props: {
    user: {
      type: Object
    }, 
  },
  setup() {
    const uStore = useUserStore();
    return { uStore };
  },
  created() {
    let user = this.uStore.getUser;
    this.privLevel = user.role;
    this.username = user.username;
    if (this.privLevel === 'admin') {
      this.privBadge = 'danger';
      this.isAdmin = true;
    }
    this.truncateUsername();
  },
  data() {
    return {
      privBadge: 'primary',
      isAdmin: false,
      privLevel: '',
      username: ''
    }
  },
  methods: {
    signOut() {
      this.uStore.signOut();
    },
    truncateUsername() {
      if (this.username.length > 14) {
        this.username = this.username.slice(0, 14-3) + '...';
      }
    },
  }
}
</script>

<style scoped>
.showCursorOnMouseOver {
  cursor: pointer;
}

.glow {
  font-size: 60px;
  color: #000000;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0047AB, 0 0 40px #0047AB, 0 0 50px #0047AB, 0 0 60px #0047AB, 0 0 70px #0047AB;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #00FFFF, 0 0 40px #00FFFF, 0 0 50px #00FFFF, 0 0 60px #00FFFF, 0 0 70px #00FFFF, 0 0 80px #00FFFF;
  }
}
</style>