<template>
<div class="modal fade" :id="game.url" tabindex="-1" :aria-labelledby="game.url" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" :id="game.url">Editing Game: {{ gameName }}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-floating">
          <textarea v-model="desc" class="form-control" placeholder="Enter your bio. Markdown is enabled." :value="`${desc}`" style="height: 100px" rows="10"></textarea>
          <label for="floatingTextarea2">Edit Description</label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" @click="updateGame" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  props:['game'],
  data() {
    return {
      gameName: '',
      desc: '',
      gameUrl: '',
    }
  },
  mounted() {
    this.gameName = this.game.name;
    this.gameUrl = this.game.url;
    this.getGameDesc();
  },
  methods: {
    async updateGame() { 
      const gameDesc = this.desc;
      const backendResponse = await fetch('/webapp/update/' + this.gameUrl, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"description": gameDesc}),
      });
    },
    async getGameDesc() {
      const descBackendResp = await fetch('/webapp/getgame/' + this.gameUrl + '/desc');

      if (descBackendResp.ok) {
        const descJSON = await descBackendResp.json();
        this.desc = descJSON;
      }
    },
  }
}
</script>