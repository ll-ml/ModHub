<template>

  <router-view>
  <router-link to="/register" custom v-slot="{ navigate }"><a class="text-nowrap btn btn-light default-font" @click="navigate" role="button">Register</a></router-link>
  </router-view>

</template>

<script>

export default {
  components: {
    
  }
}
</script>