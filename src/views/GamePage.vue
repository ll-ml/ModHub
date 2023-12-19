<template>
    <div>
        <div class="col-12">
        <div class="card">
        <img :src="`/webapp/images/static/${this.$route.params.gamename}`" class="force-fit-image">
        <div class="card-img-overlay">
            <h1 class="card-title outlineText text-center">{{ gameInfo.name }}</h1>
        </div>
        </div>
        </div>
    </div>
    <!--- TITLE PAGE END -->
<div class="container">
    <div class="card">
        <div class="card-body">
          <router-view>
            <div class="d-lg-flex justify-content-between text-truncate">
                <li class="list-group-item"><i class="bi bi-box-arrow-down"></i> Total Downloads: {{ gameInfo.downloads }}</li>
                <li class="list-group-item"><i class="bi bi-calendar-check"></i> Release Date: {{ gameInfo.release }}</li>
                <li class="list-group-item"><i class="bi bi-database"></i> Size: {{ gameInfo.size }}</li>
                <button type="button" @click="downloadGame" class="btn btn-primary btn-lg">Download</button>
            </div>
          </router-view>
        </div>
    </div>
</div>

<!-- BEGIN DEATIALS -->
<div class="container py-2">
<div class="card text-wrap info-card">
  <div class="card-body">

    <div class="text-center">
      <span v-html="gameInfo.description"></span>
    </div>
  </div>
</div>
</div>

</template>

<script>
export default {
    components: {
      
    },
    created() {
        this.getGameInfo();
    },
    updated() {
      document.title = this.gameInfo.name + ' | Zyyta.com';
    },
    data() {
        return {
            isDownloading: false,
            gameInfo: [],
        }
    },
    methods: {
        downloadGame() {
          this.isDownloading = true;
          const downloadUrl = '/webapp/download/' + this.$route.params.gamename;
          const link = document.createElement("a");
          link.href = downloadUrl;
        
            
          link.download = this.$route.params.gamename;

          link.addEventListener('load', () => {
              this.isDownloading = false;
              this.doneDownloading = true;
              this.doneMessage = 'File: ' + this.$route.params.gamename + ' has been downloaded, enjoy.';
          });
           link.addEventListener('error', () => {
             console.log('error')
          });
          link.click();
        },
        async getGameInfo() {
          const gameBackendRes = await fetch("/webapp/game/" + this.$route.params.gamename);
          if (gameBackendRes.ok) {
            const gameInfo = await gameBackendRes.json();
            this.gameInfo = gameInfo;
          } else {
            console.log('Error getting game info');
          }
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