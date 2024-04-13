<template>
<div class="modal fade" :id="mod.url" tabindex="-1" :aria-labelledby="mod.url" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" :id="mod.url">Editing Mod: {{ title }}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label">Edit Mod Title</label>
            <input v-model="mod.modTitle" type="text" class="form-control" placeholder="Title">
        </div>

        <div class="mb-3">
          <label class="form-label">Edit Quick About</label>
          <input v-model="brief" type="text" class="form-control" placeholder="Enter a brief description of your mod.">
        </div>

        <div class="form-floating">
          <textarea v-model="desc" class="form-control" placeholder="Enter your bio. Markdown is enabled." :value="`${desc}`" style="height: 100px" rows="10"></textarea>
          <label for="floatingTextarea2">Edit Description</label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" @click="updateMod" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  props:['mod'],
  data() {
    return {
      title: '',
      desc: '',
      brief: '',
    }
  },
  mounted() {
    console.log(this.mod);
    this.title = this.mod.modTitle;
    this.brief = this.mod.brief;
    this.getModDesc();

  },
  methods: {
    async updateMod() {
      const modTitle = this.title; 
      const modBrief = this.brief; 
      const modDesc = this.desc;
      const backendResponse = await fetch('/webapp/test', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({modTitle, modBrief, modDesc}),
      });
    },
    async getModDesc() {
      const descBackendResp = await fetch('/webapp/getmod/' + this.mod.url + '/desc');

      if (descBackendResp.ok) {
        const descJSON = await descBackendResp.json();
        this.desc = descJSON;
      }
    },
  }
}
</script>