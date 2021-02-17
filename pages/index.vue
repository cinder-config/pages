<template>
    <b-container class="mt-5">
        <div class="text-center mb-5">
            <h1>Separating Wheat From Chaff: Detecting Genuine Continuous Integration Configurations</h1>
        </div>
        <b-row>
            <b-col cols="8" offset="2">
                <div class="text-left">
                    <p>Continuous Integration (CI) is a corner stone of modern software engineering that makes it
                        possible to release reliable software fast. The benefits are widely accepted and have also been
                        confirmed in scientific studies.
                    </p>
                    <p>
                        It is very easy to get started. Services like Travis CI, Github Actions, or GitLab make it
                        straight-forward to adopt CI in new projects and to create an automated build pipeline from
                        scratch. Unfortunately, due to the low entrance barrier, many trivial or “toy-like” projects
                        exist that are not representative for serious CI pipelines. This makes it unnecessary hard for
                        newcomers to find good examples to learn from and also threatens the validity of studies that do
                        not exclude these immature projects.
                    </p>
                    <p><strong>This has to change!</strong></p>
                </div>
            </b-col>
        </b-row>
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
