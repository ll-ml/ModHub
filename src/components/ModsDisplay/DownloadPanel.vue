<template>
<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#downloadModal">Download</button>

<div class="modal fade" id="downloadModal" tabindex="-1" aria-labelledby="downloadModal" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header text-wrap">
        <h1 class="modal-title fs-5 zyyta-logo-font" id="downloadModalLabel">Confirm Your Download: {{ modTitle }}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><i class="bi bi-file-earmark-zip"></i> Format: {{ fileFormat }} archive</li>
            <li class="list-group-item"><i class="bi bi-database"></i> File size: {{ fileSize }}</li>
            <li class="list-group-item"><i class="bi bi-shield-check text-success"></i> Malware scan: <a href="https://www.clamav.net/" target="_blank">Safe</a></li>
        </ul>

        <hr class="my-2">

        <div class="text-center py-2">
            <button type="button" class="btn btn-outline-success" @click="downloadMod">Confirm</button>
        </div>

        <notification-success v-if="doneDownloading" :message="doneMessage"></notification-success>
        <notification-alert v-if="downloadError" :message="doneMessage"></notification-alert>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import NotificationSuccess from '@/components/Notifications/NotificationSuccess.vue';
import NotificationAlert from '@/components/Notifications/NotificationAlert.vue';

export default {
    props: ['fileSize', 'modTitle'],
    components: {
        NotificationSuccess,
        NotificationAlert
    },
    created() {
        this.getArchiveFormat();

    },
    data() {
        return {
            modFileInfo: [],
            isDownloading: false, 
            doneDownloading: false,
            downloadError: false,
            fileFormat: '',
            extension: '',
            doneMessage: '',
        }

    },
    methods: {
        async downloadMod() {
            this.isDownloading = true;
            const downloadUrl = '/webapp/download/' + this.$route.params.gamename + '/' + this.$route.params.mod;
            const link = document.createElement("a");
            link.href = downloadUrl;
        
            //Allow for 7z files to be properly downloaded
            
            link.download = this.$route.params.mod + this.extension;

            link.addEventListener('load', () => {
                this.isDownloading = false;
                this.doneDownloading = true;
                this.doneMessage = 'File: ' + this.$route.params.mod + '.zip has been downloaded, enjoy.';
                
            });

             link.addEventListener('error', () => {
                this.isDownloading = false;
                this.doneDownloading = false;
                this.downloadError = true;
                this.doneMessage = 'Error downloading the file.';
            });

            link.click();
        },
        async getArchiveFormat() {
            const fileTypeResponse = await fetch('/webapp/type/'+ this.$route.params.gamename + '/' + this.$route.params.mod);
            const archiveType = fileTypeResponse.headers.get('Content-Type');
    
            if(archiveType == "application/zip") {
                this.fileFormat = "standard .zip file";
                this.extension = '.zip';
            } else {
                this.fileFormat = ".7z file";
                this.extension = '.7z';
            }

        }

    }
}
</script>