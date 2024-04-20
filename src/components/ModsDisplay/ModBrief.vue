<template>
    <div class="card">
        <div class="card-body">
            {{ mod.modTitle }}
        </div>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" class="btn btn-primary" @click="getModDesc" data-bs-toggle="modal" :data-bs-target="`#${mod.url}`">Edit Mod</button>

            <button class="btn btn-danger" @click="deleteMod" type="button">Delete Mod</button>
            <mod-edit :mod="mod"></mod-edit>
        </div>
    </div>
<!-- Modal -->
</template>

<script>
import ModEdit from '@/components/UserSettings/ModEdit.vue';

export default {
    components: {
        ModEdit
    },
    props: ['mod'],
    created() {

    },
    data() {
        return {
            
        }
    },
    methods: {
        async deleteMod() {
            const deleteBackendResp = await fetch('/webapp/delmod/' + this.mod.image, {
             method: 'DELETE',}).then(deleteBackendResp => {
                if (deleteBackendResp.ok) {
                    //console.log("Deleted");
                }
             });
        }
    }
}
</script>