<template>
<div>
<h3 class="text-light text-center bg-secondary zyyta-logo-font">{{ modListTitle }}</h3>
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
import ModCard from './ModCard.vue'

export default {
  props: ['titleofMods'],
  components: {
    ModCard
  },
    created() {
      this.getMods();

      if (this.titleofMods === 'undefined') {
        this.modListTitle = 'Random Mods.';
      }else {
        this.modListTitle = this.titleofMods;
      }
    },
    data() {
        return {
          mods: [],
          modListTitle: '',
        }
    },
    methods: {
      async getMods() {
        const backendResp = await fetch('webapp/getmods');
        if (backendResp.ok) {
          let modList = await backendResp.json();
          this.mods = modList.mods;

        } else {
          this.mods = null;
        }
      },
    }
}
</script>