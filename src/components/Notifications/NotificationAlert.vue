<template>
<div class="alert alert-danger" role="alert">
 <i class="bi bi-exclamation-circle"></i> {{ message }}
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