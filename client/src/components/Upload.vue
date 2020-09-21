<template>
  <div class="example-drag">
    <div class="upload">
      <ul v-if="files.length">
        <li v-for="(file) in files" :key="file.id">
          <div class="file-info text-center drop-file">
              <span>{{file.name}}</span>
              <button class="btn btn-danger remove" @click.prevent="$refs.upload.remove(file)">Remove</button> 
          </div>
          
            
        </li>
      </ul>
      <ul v-else>
          <div class="text-center drop-file">
            <label for="file" class="btn btn-lg btn-primary">Select a file</label>
            <h4>or drop anywhere to upload.</h4>
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
import { ToastPlugin } from 'bootstrap-vue';
import Vue from 'vue';

Vue.use(ToastPlugin)

export default {
  name: 'Upload',
  components: {
    FileUpload
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
        this.$emit('status', true);
        this.$emit('file-data', newFile.response);
      }

      if (newFile && newFile.error && !newFile.active) {
        this.$bvToast.toast('Something went wrong. Try again!', {
          title: 'Oops!',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-bottom-right',
          append: true,
          autoHideDelay: 3000
        });
        this.$refs.upload.remove(newFile)
      }

      if (newFile && !newFile.name.includes('.csv')) {
        this.error = true;
        this.$bvToast.toast('Please select a .csv file.', {
          title: 'File type incorrect.',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-bottom-right',
          append: true,
          autoHideDelay: 3000
        });
      } else if (newFile && newFile.name.includes('.csv')){
        this.error = false;
      }
    }
  }
}
</script>

<style scoped>

.example-drag {
  padding: 25px;
}

.drop-file {
  background-color: #fff;
  padding: 50px;
  border: 2px dashed #70A9A1;
  border-radius: 15px;
  height: 200px;
  font-size: 18px;
}

.drop-file h4 {
  margin-top: 10px;
  font-size: 18px;
}

.btn-primary {
  background-color: #007C77;
  border: 1px solid #007C77;
}

.btn-primary:hover {
  background-color: #70A9A1;
  border: 1px solid #70A9A1;
}

.btn-success {
  background-color: #70A9A1;
  border: 1px solid #70A9A1;
}

.btn-success:hover, .btn-success:focus {
  background-color: #A8CFBD;
  border: 1px solid #A8CFBD;
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove {
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
  background: #878787;
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