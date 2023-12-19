<template>
<div class="alert alert-success" role="alert">
 <i class="bi bi-check-circle"></i> {{ message }}
</div>
</template>

<script> 
export default{
    props:['message'],
    data() {
        return {
        }
    }
}
</script>