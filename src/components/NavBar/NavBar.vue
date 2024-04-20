<template>
<nav
  class="navbar navbar-expand-lg sticky-top py-3 navbar-dark bg-dark bg-gradient navbar navbar-expand-lg"
>
  <router-view>
  <div class="container-fluid">
    <router-link to="/"
    custom v-slot="{ navigate }">
    <a class="fs-2 navbar-brand zyyta-logo-font showCursor outlineText" @click="navigate">
      <img src="../../assets/static_images/zyyta_home.png" alt="ZyytaIcon" @click="navigate" width="60" height="54">
        ModHub
    </a>
    </router-link>
  </div>

<!-- SEACH BAR -->
  <div class="container-fluid">
    <form class="d-flex" role="search" @submit.prevent>
      <input v-model="searchInput" class="form-control large-search-input me-2" type="search" name="searchInput" placeholder="Search" aria-label="Search" autocomplete="off">
        <button @click="search" class="btn btn-outline-light" type="submit"><i class="bi bi-search"></i></button>
    </form>
  </div>
  
  <!-- PROFILE OPTIONS -->
  <div class="text-nowrap default-font">
    <div class="d-grid gap-2 d-md-flex px-4 justify-content-md-end">
    <button v-if="!uStore.getUser" type="button" class="btn text-nowrap btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Log In
    </button>

    <login-options v-if="!uStore.getUser"></login-options>
    <profile-options :user="uStore.getUser" v-if="uStore.getUser"></profile-options>
    </div>
  </div>

   <div class="px-2 text-nowrap">
     <!-- THEME SELECTOR -->
    <theme-selector></theme-selector>
  </div>
  </router-view>
</nav>
<!-- end nav -->
<login-modal></login-modal>
<!-- end nav -->
</template>


<script>
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router'
import LoginOptions from './LoginOptions.vue';
import ProfileOptions from './ProfileOptions.vue';
import ThemeSelector from './ThemeSelector.vue';
import LoginModal from './LoginModal.vue';

export default {
  components: { LoginOptions, ProfileOptions, ThemeSelector, LoginModal},
  setup() {
    const uStore = useUserStore();
    const router = useRouter();
    return { uStore,  router};
  },
  created() {
    this.uStore.fetchUser();
  },
  updated() {

  },
  data() {
    return {
      searchInput: ''
    }
  },
  methods: {
    search() {
      this.$router.push({ path: `/search/${this.searchInput}` });
      this.searchInput = '';
    },
  }
}
</script>
<style>
.zyyta-logo-font {
  font-family: "jersey_10_charted";
}
.default-font {
  font-family: "SpaceGrotesk-Regular";
}

.search {
  text-align: center;
}

::-webkit-input-placeholder {
  text-align: center;
}

:-moz-placeholder {
  text-align: center;
}

.outlineText {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px;
}

.showCursor {
    cursor: pointer;
}

.large-search-input {
  width: 400px !important;
  margin: 0 auto;
}

/* Media query for smaller displays (e.g., screens less than 600px wide) */
@media (max-width: 800px) {
  .large-search-input {
    width: 100% !important; /* Make the search bar full width */
    margin: 0; /* Remove any horizontal margin */
  }
}
</style>