<template>
    <b-container class="mt-5">
        <div class="text-center mb-5">
            <h1>Datasets</h1>
        </div>
        <div class="text-center">
            <p>The datasets can be found here: <a href="https://github.com/cinder-config/classifier">https://github.com/cinder-config/classifier</a>
            </p>
        </div>
    </b-container>
</template>

<script>
  import axios from 'axios';

  export default {
    layout: 'default',
    data() {
      return {
        apiUrl: process.env.apiUrl,
      };
    },
  };
</script>
<style scoped>
    img {
        width: 100%;
        height: auto;
    }
</style>
