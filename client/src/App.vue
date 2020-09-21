<template>
  <div id="app">
    <upload v-if="!status" @status="changeStatus" @file-data="setData" />
    <csv v-else v-bind:file-rows='fileData.fileRows' v-bind:new-template='fileData.newTemplate' />
  </div>
</template>

<script>
import Upload from './components/Upload';
import Csv from './components/Csv';

export default {
  name: 'App',
  components: {
    Upload, Csv
  },
  data() {
    return {
      uploadStatus: false,
      fileData: {},
      status: false
    }
  },
  methods: {
    changeStatus(status) {
      this.status = status;
    },
    setData(data) {
      this.fileData = data;
    }
  }
}
</script>

<style>
#app {
  background-color: #F4F5F1;
}

body, html {
  font-family: "Segoe UI";
  background-color: #F4F5F1;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
}
</style>
