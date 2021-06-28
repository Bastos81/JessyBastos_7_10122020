<template>
  <div id="app">
    <div
      id="nav"
      class="d-flex sticky-top justify-content-start justify-content-center mb-3"
    >
      <router-link to="/">
        <img
          id="logo"
          :src="require('./assets/logos/icon-above-font.png')"
          alt="logo Groupomania"
        />
      </router-link>
    </div>
    <NotificationAlert />
    <router-view />
  </div>
</template>

<script>
import NotificationAlert from '../src/components/NotificationAlert'

export default {
  name: 'App',
  components: {
    NotificationAlert
  }
}
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  background: rgb(255, 225, 220);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 0px 0px 700px 700px;
  #logo {
    max-width: 300px;
  }
}

@media screen and (min-width: 0px) and (max-width: 767px) {
  body,
  .btn,
  .form-control {
    font-size: 13px !important;
  }

  #nav {
    border-radius: unset;
    #logo {
      max-width: 180px;
    }
  }
}

@media screen and (min-width: 767px) and (max-width: 991px) {
  #nav #logo {
    max-width: 200px;
  }
}
</style>
