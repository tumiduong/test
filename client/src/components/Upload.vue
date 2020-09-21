<template>
  <div class="example-drag">
    <div class="upload text-center p-5">
      <ul v-if="files.length">
        <li v-for="(file) in files" :key="file.id">
          <div class="file-info">
            <span>{{file.name}}</span>
            <button class="btn btn-danger" @click.prevent="$refs.upload.remove(file)">Remove</button>
          </div>
          <b-alert show variant='warning' class='error-type' v-if="error">Please select a .csv file.</b-alert>
          <p class="uploading" v-else-if="file.active">Uploading..</p>
        </li>
      </ul>
      <ul v-else>
          <div class="text-center p-5">
            <h4>Drop file anywhere to upload<br/>or</h4>
            <label for="file" class="btn btn-lg btn-primary">Select File</label>
          </div>
      </ul>

      <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
        <h3>Drop files to upload</h3>
      </div>

      <div class="example-btn text-center">
        <file-upload
          post-action="/customers/upload"
          accept='text/csv'
          extensions='csv'
          :multiple='false'
          :drop="true"
          :drop-directory="true"
          v-model="files"
          @input-filter="inputFilter"
          ref="upload">
        </file-upload>
        <button type="button" class="btn btn-success" :disabled="!files.length || error" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
          Upload
        </button>
        <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component';
import { BAlert } from 'bootstrap-vue'

export default {
  name: 'Upload',
  components: {
    FileUpload, BAlert
  },
  data() {
    return {
      files: [],
      error: false
    }
  },
  methods: {
    inputFilter(newFile) {
      if (newFile && newFile.success) {
        this.$emit('status', true)
        this.$emit('file-data', newFile.response)
      }

      if (newFile && !newFile.name.includes('.csv')) {
        this.error = true
      } else if (newFile && newFile.name.includes('.csv')){
        this.error = false
      }
    }
  }
}
</script>

<style scoped>
.error-type {
  font-size: 14px;
  width: 200px;
  margin: auto;
  margin-top: 15px;
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.uploading {
  font-size: 12px;
}

.upload {
  font-size: 18px;
}

.btn-danger {
  border-radius: 25px;
  font-size: 12px;
  margin: 0px 5px;
  padding: 3px 10px;
}

.btn:disabled {
  background-color: lightgray;
  border-color: lightgray;
}

ul {
  padding: 0;
  list-style-type: none;
}

.example-drag label.btn {
  margin-bottom: 0;
}

.example-drag .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}

.example-drag .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>