<template>
    <b-container class="mt-5">
        <div class="text-center mb-5">
            <h1>Demo</h1>
            <p>Try it out! Enter GitHub Repository.</p>
        </div>
        <div class="start">
            <b-row>
                <b-col cols="6" offset="3">
                    <form>
                        <div class="form-group">
                            <label for="github"></label>
                            <input spellcheck="false" v-model="github" class="form-control" id="github" type="text"
                                   name="github">
                        </div>
                        <b-alert variant="danger" :show="extractError !== null">{{ extractError }}</b-alert>
                        <div class="form-group text-center">
                            <button :disabled="github === ''" type="submit" class="btn btn-primary"
                                    v-on:click="extract">Lets go!
                            </button>
                        </div>
                        <div v-if="extracting">
                            <font-awesome-icon class="spinner-icon" spin :icon="['fas', 'spinner']"/>
                            <span>Extracting features...</span>
                            <span v-if="extractingTime > 1">Depending on the repository size, this might take a while...</span>
                        </div>
                    </form>
                </b-col>
            </b-row>
        </div>
        <div class="extraction" v-if="featuresJson !== null">
            <div class="form-group">
                <label for="features"></label>
                <textarea v-model="featuresJson" spellcheck="false" name="features" id="features" class="form-control"
                          rows="25"></textarea>
            </div>
            <b-alert variant="danger" :show="featuresInvalidJsonError !== null">{{ featuresInvalidJsonError }}</b-alert>
        </div>
        <div class="classification" v-if="classification !== null">
            <b-alert :variant="classification.type" :show="true">{{ classification.message }}<br>Probability: {{
                classification.probability}}
            </b-alert>
        </div>
    </b-container>
</template>

<script>
  import axios from 'axios';

  export default {
    layout: 'default',
    data() {
      return {
        extractApiUrl: process.env.extractApiUrl,
        predictApiUrl: process.env.predictApiUrl,
        github: '',
        extracting: false,
        extractError: null,
        extractingTime: 0,
        features: null,
        featuresJson: null,
        featuresInvalidJsonError: null,
        classifying: false,
        classifyError: null,
        classification: null,
      };
    },
    watch: {
      featuresJson: function(newValue) {
        try {
          this.featuresInvalidJsonError = null;
          this.features = JSON.parse(newValue);
          this.featuresJson = JSON.stringify(this.features, null, 2);
        } catch (err) {
          this.featuresInvalidJsonError = 'The JSON is not valid. ' + err;
        }
      },
      features: function(newValue) {
        this.classify();
      }
    },
    methods: {
      extract: function(e) {
        e.preventDefault();
        let that = this;
        that.extractError = null;
        that.extracting = true;
        that.extractingTime = 0;
        that.classification = null;
        that.features = null;

        let counter = setInterval(timer, 1000);

        function timer() {
          that.extractingTime++;
        }

        axios.post(that.extractApiUrl + '/extract', {target: that.github}, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(function(response) {
          clearInterval(counter);
          if (response.status === 200) {
            if (response.data.status === 'success') {
              that.features = response.data.features;
              that.featuresJson = JSON.stringify(that.features);
            } else {
              that.extractError = response.data.reason;
            }
          } else {
            that.extractError = 'There seems to be some server error, please retry later...';
          }
          that.extracting = false;
        });
      },
      classify: function() {
        let that = this;

        that.classifying = true;
        that.classificationError = null;
        that.classification = null;

        axios.post(that.predictApiUrl + '/predict', this.features, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(function(response) {
          if (response.status === 200) {
            if (response.data.status === 'success') {
              let classification = response.data.message;
              if (classification.prediction === 1) {
                that.classification = {
                  message: 'Yay! The repository contains a genuine configuration!',
                  type: 'success',
                  probability: classification.probability,
                };
              } else {
                that.classification = {
                  message: 'Oh snap! It looks like the repository does not contain a geniune configuration.',
                  type: 'danger',
                  probability: classification.probability,
                };
              }
            } else {
              that.classificationError = response.data.message;
            }
          } else {
            that.classificationError = 'There seems to be some server error, please retry later...';
          }
          that.classifying = false;
        });
      },
    },
  };
</script>
<style scoped>
    #features {
        font-size: 12px;
    }

    .spinner-icon {
        font-size: 36px;
    }
</style>
