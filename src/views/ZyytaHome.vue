<template>
  <featured-games-display></featured-games-display>
  <mods-display :titleofMods="modListHomeTitle"></mods-display>
</template>
<script>
// @ is an alias to /src
import ModsDisplay from '@/components/ModsDisplay/ModsDisplay.vue';
import FeaturedGamesDisplay from '@/components/GamesDisplay/FeaturedGamesDisplay.vue';

export default {
  name: 'HomeView',
  components: {
    ModsDisplay,
    FeaturedGamesDisplay
  },
  created() {
    this.setTitle()

  },
  data() {
    return {
      modListHomeTitle: 'Mod Showcase',

    }
  },
  methods: {
    setTitle() {
      document.title = "Zyyta.com | Games and Mods"
    }

  },
}
</script>
