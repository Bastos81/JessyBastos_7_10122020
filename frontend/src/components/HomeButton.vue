<template>
  <div>
    <button
      @click="changeOrReloadPage('Posts')"
      class="home-btn d-flex position-fixed justify-content-center align-items-center p-0"
      aria-label="Voir la page d'accueil"
    >
      <b-icon icon="house"></b-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: 'HomeButton',
  props: {},

  methods: {
    changeOrReloadPage (name) {
      if (name === this.$route.name) return window.location.reload()
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss">
.home-btn {
  top: 22px;
  right: 250px;
  box-shadow: 0px 1px 1px 1px rgba(204, 204, 204, 0.2);
  background-color: rgba(108, 117, 125, 0.1) !important;
  border-radius: 100%;
  width: 42px;
  height: 42px;
  border: none;
  z-index: 2;
  &:hover {
    background-color: rgba(108, 117, 125, 0.2) !important;
  }
  &:focus {
    outline: none;
  }
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .home-btn {
    top: 17px;
    right: 105px;
    width: 32px;
    height: 32px;
  }
}
</style>