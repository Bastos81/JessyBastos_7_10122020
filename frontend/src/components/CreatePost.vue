<template>
  <div>
    <b-form @submit="onSubmit">
      <PostForm
        @onFileSelected="onFileSelected"
        v-model="content"
        :onFormSubmit="didSubmitForm"
        :isCreating="true"
      />
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PostForm from './PostForm'

export default {
  name: 'CreatePost',
  components: {
    PostForm
  },
  props: {},
  data () {
    return {
      content: '',
      selectedFile: null,
      didSubmitForm: false
    }
  },
  methods: {
    ...mapActions(['createPost', 'displayNotification']),

    onFileSelected (file) {
      this.selectedFile = file
    },

    async onSubmit (event) {
      const regex = /^[a-z0-9-\d\-_.!?#*()"":;,=+$€£@&çéàèïë\s]+$/i
      const postText = this.content
        if (!postText.match(regex) && postText != '') {
        alert('Certains caractères spéciaux ne sont pas acceptés !')
      } else {
        await this.createPost({
        selectedFile: this.selectedFile,
        content: this.content
      })
      this.displayNotification('Publication créée !')
      this.resetForm(event)
      }
    },

    resetForm (event) {
      event.target.reset()
      this.content = ''
      this.selectedFile = null
      this.didSubmitForm = !this.didSubmitForm
    }
  }
}
</script>

<style lang="scss">
.custom-file-label {
  text-align: left;
}
</style>
