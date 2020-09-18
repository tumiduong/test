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
      console.log(this.fileData)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
