<template>
    <div class="container py-2">
        <div class="card text-wrap">
            <div class="card-header">
                <h3 class="card-title text-center zyyta-logo-font">Upload Game</h3>
            </div>
                <div class="card-body">

                    <hr class="my-4">

                    <h3 class="text-center">File Upload</h3>

                    <div class="mb-3">
                        <label for="formFileLg" class="form-label">Game File Upload</label>
                        <input class="form-control form-control-lg" type="file" ref="gameFileInput" @change="checkGameFile">
                    </div>
                    
                    <div class="d-grid py-4 gap-2 col-3 mx-auto">
                        <button @click="uploadGame" class="fs-4 btn btn-outline-primary" type="button" :disabled="disabledUpload">
                            <span v-if="isUploading" class="spinner-border text-dark" role="status" aria-hidden="true"></span>
                            <span v-else>Upload Game</span> 
                        </button>
                    </div>
                    
                    <div v-if="isUploading" class="progress" role="progressbar" aria-label="Game Upload Stat" :aria-valuenow="`${uploadPercent}`" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" :style="`width: ${uploadPercent}%`"></div>
                    </div>
                    

                    <notification-success v-if="uploadStatus === 'success'" :message="statusText"></notification-success>
                    <notifications-alert v-if="uploadStatus === 'failed'" :message="statusText"></notifications-alert>
                </div>
        </div>

        <div class="container py-3">
            <h4 class="text-center zyyta-logo-font"> Current Games</h4>
            <div v-for="(game, index) in games" :key=index>
                <game-brief :game="game"></game-brief>
                <div class="py-2"></div>
            </div>
        </div>

    </div>
</template>

<script>
import NotificationSuccess from '@/components/Notifications/NotificationSuccess.vue';
import NotificationsAlert from '@/components/Notifications/NotificationAlert.vue'
import GameBrief from '@/components/GamesDisplay/GameBrief.vue';
import { useUserStore } from '@/store/user';

export default {
    components: {
        NotificationSuccess,
        NotificationsAlert,
        GameBrief
    },
    setup() {
        const uStore = useUserStore();
        return { uStore };
    },
    created() {
        this.getGames();
        document.title = 'Admin Upload | Zyyta.com';  
    },
    data() {
        return {
            title: '',
            description: '',
            author: '',
            
            statusText: '',
            isUploading: false,
            notAuthor: '',
            imagePreviewURLs: [],
            uploadStatus: '',
            uploadPercent: '0',
            disabledUpload: false,
            games: [],
        }
    },
    methods: {
        async uploadGame() {
            this.isUploading = true;
            this.disabledUpload = true;
            const gameFiles = this.$refs.gameFileInput.files[0];
            //const imageFile = this.$refs.imageFileInput.files[0];

            const chunkSize = 4 << 20; //4 MB Chunk size per upload request
            const totalChunks = Math.ceil(gameFiles.size / chunkSize);
            let currentChunk = 0; 

            while(currentChunk < totalChunks) {
                const gameData = new FormData();
                const start = currentChunk * chunkSize; 
                const end = Math.min(start + chunkSize, gameFiles.size);

                const chunk = gameFiles.slice(start, end);

                gameData.append('gameFileData', chunk, gameFiles.name);

                try {
                    const gameUploadResponse = await fetch('/webapp/upload-game', { 
                    method: 'POST',
                    body: gameData 
                    });

                    if(gameUploadResponse.ok) {
                        let uploadPercentCurrent = (currentChunk / totalChunks) * 100;
                        this.uploadPercent = uploadPercentCurrent.toString();
                    } else {
                        this.uploadStatus = 'failed';
                        this.statusText = "There was an error uploading your file.";
                        return;
                    }
                } catch(error) {
                    this.uploadStatus = 'failed';
                    this.statusText = "ERROR: " + error.message;
                }
                currentChunk++;
            }
            this.uploadStatus = 'success'
            this.statusText = "Game successfully uploaded to server."
            this.isUploading = false;
            this.disabledUpload = false;
        },
        checkGameFile(event) {
            const modFile = event.target.files[0];
            const fileType = modFile.type;
            const fileName = modFile.name.toLowerCase();

            if(fileType === 'application/zip' || 
               fileName.endsWith('.7z')) {
                this.disabledUpload = false;
               } else {
                this.disabledUpload = true;
               }
        },
        async getGames() {
            const gamesBackendRes = await fetch('/webapp/getgames')
            if (gamesBackendRes.ok) {
                const gameList = await gamesBackendRes.json();
                this.games = gameList.games;
            } else {
                this.games = null;
            }

        }
    }

}
</script>
