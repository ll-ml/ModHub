<template>
    <div class="container py-2">
        <div class="card text-wrap">
            <div class="card-header default-font">
                <h3 class="card-title text-center zyyta-logo-font">Settings: {{ signedInUser }}</h3>
            </div>
                <div class="card-body default-font">
                    <div class="form-floating">
                        <textarea v-model="bio" class="form-control" placeholder="Enter your bio. Markdown is enabled." :value="`${bio}`" style="height: 100px" rows="10"></textarea>
                        <label for="floatingTextarea2">Your Bio</label>
                    </div>

                     <div class="d-grid py-4 gap-2 col-3 mx-auto">
                        <button @click="updateBio" class="fs-4 btn btn-outline-primary" type="button" :disabled="disabledUpload">
                            <span v-if="isUploading" class="spinner-border text-dark" role="status" aria-hidden="true"></span>
                            <span v-else>Update Bio</span> 
                        </button>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Username</label>
                        <input v-model="username" :placeholder="`${signedInUser}`" type="text" class="form-control">
                        <div class="d-grid py-4 gap-2 col-3 mx-auto">
                            <button @click="changeUsername" class="fs-4 btn btn-outline-danger" type="button" :disabled="disabledUpload">
                                <span>Change Username</span> 
                            </button>
                        </div>
                        <div class="alert alert-warning" role="alert">
                            <i class="bi bi-info-square-fill"></i> You will be signed out upon changing your username. Sign back in with your new username.
                        </div>
                    </div>

                    <hr class="my-4">

                    <h3 class="text-center">Profile Picture Upload</h3>

                     <div class="mb-3">
                        <label for="formFileLg" class="form-label">Avatar Upload</label>
                        <input class="form-control form-control-lg" type="file" ref="imageFileInput" @change="previewImage" multiple>
                    </div>

                    <div class="container" v-if="imagePreviewURLs">
                        <p class="zyyta-logo-font">Your image previews:</p>
                        <div v-for="(preview, index) in imagePreviewURLs" :key="index">
                            <img :src="preview" class="img-thumbnail" alt="preview">
                        </div>
                    </div>
                    
                    <div class="d-grid py-4 gap-2 col-3 mx-auto">
                        <button @click="uploadGame" class="fs-4 btn btn-outline-primary" type="button" disabled="true">
                            <span v-if="isUploading" class="spinner-border text-dark" role="status" aria-hidden="true"></span>
                            <span v-else>Upload Image</span> 
                        </button>
                    </div>
            
                    <notification-success v-if="uploadStatus === 'success'" :message="statusText"></notification-success>
                    <notifications-alert v-if="uploadStatus === 'failed'" :message="statusText"></notifications-alert>

                </div>
        </div>

        <div v-if="hasMods" class="container py-3">
            <h4 class="text-center zyyta-logo-font">Your Mods</h4>
            <div v-for="(mod, index) in mods" :key=index>
                <mod-brief :mod="mod"></mod-brief>
                <div class="py-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import NotificationSuccess from '@/components/Notifications/NotificationSuccess.vue';
import NotificationsAlert from '@/components/Notifications/NotificationAlert.vue';
import ModBrief from '@/components/ModsDisplay/ModBrief.vue';
import { useUserStore } from '@/store/user';

export default {
    components: {
        NotificationSuccess,
        NotificationsAlert,
        ModBrief,
    },
    setup() {
        const uStore = useUserStore();
        return { uStore }

    },
    created() {
        this.signedInUser = this.uStore.getUser.username;
        document.title = 'Settings for ' + this.signedInUser + ' | Zyyta.com';
        this.fetchBio();
        this.fetchUsersMods();
    },
    data() {
        return {
            username: '',
            bio: '',
            signedInUser: '',
            author: '',
            hasMods: false,
            mods: [],
            
            statusText: '',
            isUploading: false,
            notAuthor: '',
            imagePreviewURLs: [],
            uploadStatus: '',
            uploadPercent: '0',
            disabledUpload: false,
        }
    },
    methods: {
        previewImage(event) {
            const selectedFiles = Array.from(event.target.files);

            for(const file of selectedFiles) {
                if(file.type.startsWith('image/')) {
                    const imagePreviewURL = URL.createObjectURL(file);
                    this.imagePreviewURLs.push(imagePreviewURL);
                }
            }
        },
        async updateBio(){ 
            if (this.bio === "") {
                return;
            }
            const userBio = this.bio;
            const uname = this.signedInUser;
            const backendResponse = await fetch('/webapp/user/bio', {
                method: 'PUT',
                body: JSON.stringify({'username': uname,  'bio': userBio})
            });

            if (backendResponse.ok) {
                this.uploadStatus = 'success';
                this.statusText = "Your bio has been updated";
            } else {
                 this.uploadStatus = 'failed';
                  this.statusText = "Something went wrong.";
            }
        },
        async fetchBio() {
            const backendResponse = await fetch('/webapp/user/' + this.signedInUser + '/bio/raw');

            if (backendResponse.ok) {
                const webappResponseJSON = await backendResponse.json();
                this.bio = webappResponseJSON.bio;
            } else {
                this.uploadStatus = 'failed';
                this.statusText = "There was an issue fetching the bio from the backend.";
            }
        },
        async fetchUsersMods() {
            const backendResponse = await fetch('/webapp/getmods/uploader/' +this.signedInUser);
            
            if (backendResponse.ok) {
                const modList = await backendResponse.json();
                this.mods = modList.mods;
                if (this.mods.length > 0) {
                    this.hasMods = true;
                } else {
                    this.hasMods = false;
                    this.mods = null;
                }
            }
        },
        async changeUsername() {
            if (this.username === '') {
                this.uploadStatus = 'failed';
                this.statusText = 'Username cannot be blank';
                return
            }
            const backendResponse = await fetch('/webapp/user/username/' + this.username);
            if(backendResponse.ok) {
                const responseJSON = await backendResponse.json();
                this.uploadStatus = 'success';
                this.statusText = responseJSON.success;
                this.uStore.signOut();
            }

        },
    }

}
</script>
