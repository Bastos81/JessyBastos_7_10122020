<template>
  <div>
    <div class="d-flex align-items-center position-relative">
      <router-link
        :to="{ name: 'UserProfile', params: { userId: comment.User.id } }"
        ><div class="d-flex text-center mr-2 mt-2">
          <ProfileImage
            :src="comment.User.imageUrl"
            customClass="comment-profile-picture"
            divCustomClass="div-comment-picture"
          /></div
      ></router-link>
      <div class="comment-box col">
        <router-link
          :to="{ name: 'UserProfile', params: { userId: comment.User.id } }"
          ><p class="mb-0 font-weight-bold comment-box-user">
            {{ comment.User.firstName }} {{ comment.User.lastName }}
          </p></router-link
        >
        <input
          v-if="isEditing"
          ref="inputContent"
          v-model="comment.content"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="modifyComment"
          @keydown.enter.shift.exact="newline"
          type="text"
          class="input-content border-0 my-2"
          aria-label="Modifier le commentaire"
        />
        <p v-else class="mb-0">{{ comment.content }}</p>
      </div>
      <div class="position-relative">
        <EditButton
          customClass="comment-button"
          classCollapse="comment-btn-collapsed"
          :isCreator="comment.User.id == userData.id"
          :isAdmin="userData.admin"
          @clickedEditButton="startEditing"
          @onDelete="onDelete"
          modifyText="Modifier"
          deleteText="Supprimer"
        />
      </div>
    </div>
    <CommentsLikesList :comment="comment" :commentsLikesCount="commentsLikesCount" />
    <button
          @click="likeOrUnlikeComment"
          class="react-btn footer-btn btn-block"
          aria-label="Liker ou disliker"
        >
          <svg
            v-if="likesThisComment"
            style="width:12px;height:12px"
            viewBox="0 0 24 24"
          >
            <path
              fill="rgb(32, 120, 244)"
              d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
            />
          </svg>
          <svg v-else style="width:12px;height:12px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"
            />
          </svg>

          <span :class="`ml-2 ${likesThisComment ? 'blue' : ''}`">J'aime</span>
        </button>
    <p class="text-secondary comment-date">
      {{
        moment(comment.updatedAt)
          .locale('fr')
          .fromNow()
      }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { apiClient } from '../services/ApiClient'
import EditButton from './EditButton'
import ProfileImage from './ProfileImage'
import CommentsLikesList from '../components/CommentsLikesList'

export default {
  name: 'Comment',
  components: {
    EditButton,
    ProfileImage,
    CommentsLikesList
  },
  props: ['comment', 'post'],
  async mounted () {
    const res = await apiClient.get(`api/posts/${this.post.id}/comments/${this.comment.id}/commentsLike`)
    this.likesThisComment = res.commentsLike
  },
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      isEditing: false,
      likesThisComment: false,
      commentsLikesCount: this.comment.commentsLikesCount
    }
  },
  methods: {
    ...mapActions(['displayNotification']),

    async likeOrUnlikeComment () {
      const res = await apiClient.post(`api/posts/${this.post.id}/comments/${this.comment.id}/commentsLikes`)

      if (res.commentsLike !== this.likesThisComment) {
        this.commentsLikesCount += res.commentsLike ? 1 : -1
      }

      this.likesThisComment = res.commentsLike
    },

    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },

    async onDelete () {
      await apiClient.delete(
        `api/posts/${this.post.id}/comments/${this.comment.id}`
      )
      this.$emit('commentDeleted', this.comment)
      this.displayNotification('Commentaire supprimé !')
    },

    startEditing () {
      this.isEditing = true
      setTimeout(() => {
        this.$refs.inputContent.focus()
      }, 30)
    },
    newline () {
      this.comment.content = `${this.comment.content}\n`
    },

    async modifyComment () {
      const res = await apiClient.put(
        `api/posts/${this.post.id}/comments/${this.comment.id}`,
        { content: this.comment.content }
      )
      this.comment.updatedAt = res.comment.updatedAt
      this.isEditing = false
      this.displayNotification('Commentaire modifié !')
    }
  }
}
</script>

<style lang="scss">
.comment-button {
  position: static !important;
  margin-left: 10px;
}

.comment-btn-collapsed {
  left: 14px;
  top: 40px;
  width: 200px;
}

.input-content:focus {
  border-radius: 0.25rem;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.comment-box-user{
  font-weight: 750;
}

.comment-date {
  font-size: 0.8rem;
  text-align: left;
  padding-left: 50px;
}

@media screen and (min-width: 280px) and (max-width: 767px) {
  .comment-date {
    font-size: 0.6rem;
  }

  .comment-button {
    margin-bottom: 0;
    margin-left: 3px;
  }

  .comment-btn-collapsed {
    left: 6px;
    top: 23px;
    width: 135px;
  }
}
</style>
