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
      maxNameLength: 14,
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
      if (this.username.length > this.maxNameLength) {
        this.username = this.username.slice(0, this.maxNameLength-3) + '...';
      }
    },
  }
}
</script>

<style scoped>
.showCursorOnMouseOver {
  cursor: pointer;
}
</style>