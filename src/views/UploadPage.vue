<template>
    <div class="container py-2">
        <div class="card text-wrap">
            <div class="card-header">
                <h3 class="card-title text-center zyyta-logo-font">Upload Mod</h3>
            </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Mod Title</label>
                        <input v-model="title" type="text" class="form-control" placeholder="Title">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Quick About</label>
                        <input v-model="brief" type="text" class="form-control" placeholder="Enter a brief description of your mod.">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea v-model="description" class="form-control" placeholder="Enter a description of your mod. Markdown is enabled." rows="10"></textarea>
                    </div>

                    <select class="form-select" v-model="game">
                        <option disabled value="">Please select a game</option>
                        <option>Fallout New Vegas</option>
                        <option>Daggerfall Unity</option>
                        <option>Morrowind</option>
                    </select>

                    <hr class="my-4">

                    <h3 class="text-center">File Upload</h3>

                     <div class="mb-3">
                        <label for="formFileLg" class="form-label">Image Upload</label>
                        <input class="form-control form-control-lg" type="file" ref="imageFileInput" @change="previewImage" multiple>
                    </div>

                    <div class="container" v-if="imagePreviewURLs">
                        <p class="zyyta-logo-font">Your image previews:</p>
                        <div v-for="(preview, index) in imagePreviewURLs" :key="index">
                            <img :src="preview" class="img-thumbnail" alt="preview">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="formFileLg" class="form-label">Mod Files Upload</label>
                        <input class="form-control form-control-lg" type="file" ref="modFileInput" @change="checkModFile">
                    </div>

                    <div class="container">
                        <p class="text-center">Are you the original author of this mod?</p>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" id="notAuthorRadio" v-model="notAuthor">
                            <label class="form-check-label" for="notAuthorRadio"> Yes, I am the author</label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="true" id="authorRadio" v-model="notAuthor">
                            <label class="form-check-label" for="authorRadio"> No, I am not the author</label>
                        </div>
                    </div>

                    <div v-if="notAuthor" class="container">
                        <div class="mb-3">
                            <label class="form-label">Original Author</label>
                            <input v-model="author" type="text" class="form-control" placeholder="Author">
                        </div>
                    </div>


                    
                    <div class="d-grid py-4 gap-2 col-3 mx-auto">
                        <button @click="uploadMod" class="fs-4 btn btn-outline-primary" type="button" :disabled="disabledUpload">
                            <span v-if="isUploading" class="spinner-border text-dark" role="status" aria-hidden="true"></span>
                            <span v-else>Upload Mod</span> 
                        </button>
                    </div>

                    <notification-success v-if="uploadStatus === 'success'" :message="statusText"></notification-success>
                    <notifications-alert v-if="uploadStatus === 'failed'" :message="statusText"></notifications-alert>

                </div>
        </div>
    </div>
</template>

<script>
import NotificationSuccess from '@/components/Notifications/NotificationSuccess.vue';
import NotificationsAlert from '@/components/Notifications/NotificationAlert.vue'

export default {
    components: {
        NotificationSuccess,
        NotificationsAlert
    },
    created() {
        document.title = 'Mod Upload | Zyyta.com';
        
    },
    data() {
        return {
            title: '',
            brief: '',
            description: '',
            game: '',
            author: '',
            
            statusText: '',
            isUploading: false,
            notAuthor: '',
            imagePreviewURLs: [],
            uploadStatus: '',
            disabledUpload: false,
        }
    },
    methods: {
        async uploadMod() {
            this.isUploading = true;
            const modFile = this.$refs.modFileInput.files[0];
            const imageFile = this.$refs.imageFileInput.files[0];

            const formFileData = new FormData();
            formFileData.append('title', this.title); 
            formFileData.append('description', this.description);
            formFileData.append('brief', this.brief);
            formFileData.append('game', this.game);
            formFileData.append('author', this.author);
    
            formFileData.append('imageFile', imageFile);
            formFileData.append('modFile', modFile);

            const response = await fetch('/webapp/upload', {
                method: 'POST',
                body: formFileData
            });

            if(response.ok) {
                this.uploadStatus = 'success';
                this.statusText = 'Success! Your mod has been uploaded.';
            }else {
                const responseText = await response.json();
                this.uploadStatus = 'failed';
                this.statusText = 'Failed. There was an issue uploading your mod: ' + responseText.error;
            }
            
            this.isUploading = false;
        },
        previewImage(event) {
            const selectedFiles = Array.from(event.target.files);

            //this.imagePreviewURLs = [];

            for(const file of selectedFiles) {
                console.log(file.name)
                if(file.type.startsWith('image/')) {
                    const imagePreviewURL = URL.createObjectURL(file);
                    this.imagePreviewURLs.push(imagePreviewURL);
                }
            }
            console.log(this.imagePreviewURLs);
        },
        checkModFile(event) {
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
    }

}
</script>
