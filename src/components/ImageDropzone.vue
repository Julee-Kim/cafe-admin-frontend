<template>
  <vue-dropzone ref="myVueDropzone" id="dropzone"
    name="file"
    :options="dropzoneOptions"
    :useCustomSlot="true"
    @vdropzone-success="success"
    @vdropzone-removed-file="removed"
  >
    <div class="dropzone-custom-content">
      <plus-icon size="15" class="ico_plus"></plus-icon>
      THUMBNAIL
    </div>
  </vue-dropzone>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { PlusIcon } from 'vue-feather-icons'

export default {
  name: 'ImageDropzone',
  components: {
    vueDropzone: vue2Dropzone,
    PlusIcon
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'http://localhost:5000/api/products/image',
        maxFiles: 1,
        acceptedFiles: 'image/*',
        addRemoveLinks: true,
        thumbnail: ''
      }
    }
  },
  methods: {
    success(file, res) {
      if(res.success) {
        this.$emit('setImageUrl', res.url)
        this.$refs.myVueDropzone.disable()
      }
    },
    removed() {
      this.$refs.myVueDropzone.enable()
    }
  }
}
</script>

<style lang="scss">
.vue-dropzone {
  padding: 10px;
  width: 150px;
  height: 150px;
  min-height: auto;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: $navy;
  color: #fff;

  &:hover { background-color: #3a445f; }

  .dz-message { margin-top: 50px; }
  .ico_plus { margin-top: -2px; }

  .dz-preview {
    border-radius: 0.25rem;

    &.dz-image-preview {
      margin: 0 !important;
    }
    .dz-success-mark { top: 30%; }
    .dz-details {
      padding: 1rem;

      .dz-size {
        margin-bottom: .5rem;
        
        strong { color: #fff; }
      }
    }
    .dz-remove {
      left: 7%;
      margin-left: 0;
    }
  }

  @media (max-width: 767px) {
		.dz-preview .dz-remove {
      bottom: 8px;
      padding: 5px 10px;
    }
	}
}
</style>