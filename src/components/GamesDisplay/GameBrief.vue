<template>
    <div class="card">
        <div class="card-body">
            {{ gameName }}
        </div>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="`#${url}`">Edit {{ gameName }}</button>

            <button class="btn btn-danger" @click="deleteGame" type="button">Delete Game</button>
            
            <game-edit :game="game"></game-edit>
            
        </div>
    </div>
<!-- Modal -->
</template>

<script>
import GameEdit from '@/components/GamesDisplay/GameEdit.vue';

export default {
    components: {
        GameEdit
    },
    props: ['game'],
    created() {
        //this.gameName = this.game.name;
    },
    mounted() { 
        this.gameName = this.game.name;
        this.url = this.game.url;
    },
    data() {
        return {
            gameName: '',
            url: '',
        }
    },
    methods: {
        async test() {
        
        }
    }
}
</script>