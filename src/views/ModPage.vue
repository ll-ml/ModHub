<template>
<div class="col-12">
<div class="card default-font">
  <img v-if="modInfo.modTitle" :src="`/webapp/images/mods/${modInfo.image}`" class="force-fit-image" :alt="`${modInfo.modTitle}`">
  <div class="card-img-overlay">
    <h1 class="card-title outlineText text-center">{{ modInfo.modTitle }}</h1>
    <h4 class="card-title outlineText text-center">{{ modInfo.brief }}</h4>
  </div>
</div>
</div>
<!-- END IMG CONTAINER -->
  <div v-if="notFound" class="text-center">
    <notification-alert :message="notFoundMessage"></notification-alert>
  </div>


<div class="container-sm">
    <div class="card">
        <div class="card-body default-font">
          <router-view>
            <div class="d-lg-flex justify-content-between text-truncate">
                <download-panel :fileSize="modInfo.fileSize" :modTitle="modInfo.modTitle"></download-panel>
                <li class="list-group-item"><i class="bi bi-box-arrow-down"></i> Total Downloads: 1002</li>
                <li class="list-group-item"><i class="bi bi-person-check-fill"></i> Original Author: {{ modInfo.author }}</li>
                <li class="list-group-item"><i class="bi bi-person-badge"></i> Uploader: <router-link :to="`/${modInfo.uploader}`" custom v-slot="{ navigate }"><a class="link-primary showCursorOnMouseOver" @click="navigate">{{ modInfo.uploader }}</a></router-link></li>
                <li class="list-group-item"><i class="bi bi-calendar-check"></i> Date Uploaded: {{ modInfo.uploadDate }}</li>
            </div>
          </router-view>
        </div>
    </div>
</div>

<!-- BEGIN DEATIALS -->
<div class="container py-2">
<div class="card text-wrap info-card">
  <div class="card-body">

    <div class="text-center default-font">
      <span v-html="modInfo.description"></span>
    </div>

  </div>
</div>
</div>

</template>
<script>
import DownloadPanel from '@/components/ModsDisplay/DownloadPanel.vue'
import NotificationAlert from '../components/Notifications/NotificationAlert.vue';

export default {
  components: {
    DownloadPanel,
    NotificationAlert,
  },
    created() {
      this.getModInfo();
    },
    updated() {
      document.title = this.modInfo.modTitle;
    },
    data() {
        return {
          modInfo: [],
          isDownloading: false,
          doneDownloading: false,
          notFound: false,
          notFoundMessage: "Mod does not exist.",
          modImageRequest: '',
          doneMessage: 'File: ',
        }
    },
     methods: {
        async getModInfo() {
            const modResponse = await fetch('/webapp/getmod/' + this.$route.params.gamename +'/'+ this.$route.params.mod);
            if(modResponse.ok) {
              const modInfo = await modResponse.json();
              this.modInfo = modInfo;
              document.title = this.modInfo.modTitle + " | Zyyta.com";
            }else {
             // this.modInfo = null;
              this.notFound = true;
              document.title = "Mod Not Found";
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

.info-card {
            border-radius: 0; /* Set border radius to 0 for square corners */
        }
</style>