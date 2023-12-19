<template>
    <div>
        <div class="col-12">
        <div class="card">
        <img :src="`/webapp/images/static/${this.$route.params.gamename}`" class="force-fit-image">
        <div class="card-img-overlay">
            <h1 class="card-title outlineText text-center">{{ gameTitle }}</h1>
        </div>
        </div>
        </div>
    </div>
    <!--- TITLE PAGE END -->
<div>
<h2 class="text-light text-center bg-secondary">Mods</h2>
  <div class="album py-5">
  <div class="container">
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
export default {
    components: {
      ModCard
    },
    created() {
        this.getModsForGame();
    },
    updated() {
      document.title = this.gameTitle + ' Mods | Zyyta.com';
    },
    data() {
        return {
            gameTitle: 'Loading..',
            mods: [],
        }
    },
    methods: {
        async getModsForGame() {
          let modsListRes = await fetch('/webapp/getmods/'+ this.$route.params.gamename);
          let mods = await modsListRes.json();

          this.mods = mods.mods;
          this.gameTitle = this.mods[0].game;
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

.outlineText {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px;
}

.forceSameLine {
  display: inline;
}

.showCursorOnMouseOver {
  cursor: pointer;
}
</style>