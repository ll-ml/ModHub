<template>
<h1 class="outlineText text-center bg-secondary">{{ username }}</h1>

  <div class="album py-5">
  <div class="container">
    <notification-alert v-if="userNotFound" :message="notFoundMessage"></notification-alert>

    <div class="container py-2">
      <div class="card text-wrap info-card" style="border-radius: 0;">
        <div class="card-body">

        <div class="text-center">
          <span v-html="bio"></span>
        </div>

      </div>
      </div>
    </div>

  <div v-if="!userNotFound">
    <h2 class="text-center">Recent Uploads</h2>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div v-for="(mod, index) in mods" class="col" :key=index>
        <mod-card :mod="mod"></mod-card>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import ModCard from '@/components/ModsDisplay/ModCard.vue'
import NotificationAlert from '@/components/Notifications/NotificationAlert.vue';

export default {
  components: {
    ModCard,
    NotificationAlert
  },
    props: ['username'],
    created() {
        document.title = this.username + " Profile | Zyyta.com";
        this.getUserInfo();
        if (!this.userNotFound) {
          this.getModsByUser();
        }
    },
    updated() {
      document.title = this.username + " | Zyyta.com";
    },
    data() {
        return {
          mods: [],
          bio: '',
          userNotFound: false,
          notFoundMessage: "User not found.",
          errorMessage: "",
        }
    },
    methods: {
      async getModsByUser() {
        let modsResponse = await fetch('/webapp/getmods/uploader/' + this.username);
        
        if(modsResponse.ok) {
          let userUploads = await modsResponse.json();
          this.mods = userUploads.mods;
        }else {
          this.mods = null;
        }
      },
      async getUserInfo() {
        let userInfoResponse = await fetch('/webapp/user/' + this.username);

        if(userInfoResponse.ok) {
          const userInfoJSON = await userInfoResponse.json();
          this.bio = userInfoJSON.bio;
        } else if (userInfoResponse.status === 404) {
          this.userNotFound = true;
        } 
      }
    }
}
</script>