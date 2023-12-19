<template>
  <div>
    <h1>DOS Games Emulator</h1>
    <div id="dosboxContainer"></div>
    <div class="d-grid gap-2">
        <button class="btn btn-primary" type="button" @click="initializeDOSBox">Load DosBox</button>
    </div>
  </div>
</template>

<script>
import { Dos } from 'js-dos';

export default {
  data() {
    return {
      dosbox: null,
    };
  },
  mounted() {
    
  },
  methods: {
    initializeDOSBox() {
       Dos(document.getElementById("dosboxContainer")).run("https://js-dos.com/cdn/digger.zip", "./DIGGER.COM");
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
