<template>
<div class="bg-dark-subtle bg-gradient">
<div class="container py-3">
  <h3 class="zyyta-logo-font outlineText text-center">Featured Games</h3>

  <div id="carouselExampleCaptions" class="carousel slide force-visable bg-dark-subtle">
  <div class="carousel-indicators force-visable">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active force-visable" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" class="force-visable" aria-label="Slide 2"></button>
  </div>
  <div class="carousel-inner">
    <router-view>
    <div class="carousel-item active">
      <router-link to="/game/daggerfall-unity" custom v-slot="{ navigate }">
      <img :src="url1" class="d-block w-100 force-fit-image showCursor" @click="navigate" alt="Daggerfall Unity">
      </router-link>
      <div class="carousel-caption d-none d-md-block">
        <h1 class="force-visable">Daggerfall Unity</h1>
        <p></p>
      </div>
    </div>
    <div class="carousel-item">
      <router-link to="/game/minetest" custom v-slot="{ navigate }">
      <img :src="url2" class="d-block w-100 force-fit-image showCursor" @click="navigate" alt="Minetest">
      </router-link>
      <div class="carousel-caption d-none d-md-block">
        <h1 class="force-visable">Minetest</h1>
        <p></p>
      </div>
    </div>
    </router-view>
  </div>
  <button class="carousel-control-prev force-visable" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon force-visable" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next force-visable" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon force-visable" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

</div>
</div>

</template>

<script>

export default {
    data() {
        return {
            url1: '/webapp/images/static/daggerfall-unity',
            url2: '/webapp/images/static/minetest',
        }
    }
}
</script>

<style scoped>
.force-fit-image {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

.force-visable {
    color: white !important; 
}

.showCursor {
    cursor: pointer;
}
</style>
