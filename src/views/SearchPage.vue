<template>
<div>
<h1 class="text-light text-center default-font bg-secondary">Search: {{ this.$route.query.q }}</h1>
<div class="album py-5">
<div class="container">
  <notification-alert v-if="notFound" :message="notFoundMessage"></notification-alert>

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
import ModCard from '@/components/ModsDisplay/ModCard.vue';
import NotificationAlert from '@/components/Notifications/NotificationAlert.vue';
import { ref } from 'vue';

export default {
    components: {
        ModCard, 
        NotificationAlert,
    },
    created() {
        this.search = this.$route.query.q;
        document.title = this.$route.query.q + ' | Search Zyyta.com';
        this.searchMods();
    },
    updated() {
        this.search = this.$route.query.q;
        document.title = this.$route.query.q + ' |  Search Zyyta.com';
        //this.searchMods(); this works but gets called recursively
    },
    data() {
        return {
            search : '',
            mods: ref([]),
            notFound: false,
            notFoundMessage: 'No mods found for your search',
        }
    },
    methods: {
        async searchMods() {
            let res = await fetch('webapp/search/mods/'+ this.search);
            let modSearchResults = await res.json();

            if(res.status === 200) {
                this.notFound = false;
                this.mods = modSearchResults.mods;
            }else {
               this.mods = null;
               this.notFound = true;
            }
        }
    }
}
</script>