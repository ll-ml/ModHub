<template>
  <div class="card shadow-lg">
  <router-view>
    <router-link :to="`/${mod.url}`" custom v-slot="{ navigate }" target="_blank">
      <img :src="`/webapp/images/mods/${mod.image}`" @click="navigate" class="card-img-top card-img-top-force-fit showCursorOnMouseOver" :alt="`${mod.modTitle}`">
    </router-link>
  <div class="card-header">
    Game: <router-link :to="`/game/${gameUrl}/mods`" custom v-slot="{ navigate }"> <a class="link-primary showCursorOnMouseOver" @click="navigate">{{mod.game}}</a></router-link>
  </div>

  <div class="card-body">
    <h4 class="card-title text-truncate">{{ mod.modTitle }}</h4>
    <p class="card-text text-truncate">{{ mod.brief }}</p>
  </div>
  <ul class="list-group list-group-flush text-truncate">
    <li class="list-group-item"><i class="bi bi-person-badge"></i> Uploader: <router-link :to="`/${mod.uploader}`" custom v-slot="{ navigate }"><a class="link-primary showCursorOnMouseOver" @click="navigate">{{ mod.uploader }}</a></router-link></li>
    <li class="list-group-item"><i class="bi bi-calendar-check"></i> Date Uploaded: {{ mod.uploadDate }}</li>
    <li class="list-group-item"><i class="bi bi-database"></i> File size: {{ mod.fileSize }}</li>
    <li class="list-group-item"><i class="bi bi-person-check-fill"></i> Original Author: {{ mod.author }}</li>
  </ul>
  <div class="card-body">
    <div class="d-grid gap-2 col-6 mx-auto">
      <router-link :to="`/${mod.url}`" custom v-slot="{ navigate }">
        <a class="btn btn-outline-secondary" @click="navigate" role="button">View</a>
      </router-link>
     </div>
  </div>
  </router-view>
  </div>
</template>

<script>
export default {
    props: ['mod'],
    created() {
       this.gameUrl = this.mod.game.toLowerCase().replaceAll(" ", "-");
    },
    data() {
        return {
          gameUrl: ''
        }
    },
    methods: {
    },
}

</script>
<style scoped>
.showCursorOnMouseOver {
  cursor: pointer;
}

.card-img-top-force-fit {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}
</style>