<template>
  <div>
    <div>
      <ProfileButton />
      <HomeButton />
      <UserSearch />
      <Notifications />
    </div>
  </div>
</template>

<script>
import ProfileButton from '../components/ProfileButton'
import HomeButton from '../components/HomeButton'
import UserSearch from '../components/UserSearch'
import Notifications from '../components/Notifications'

export default {
  name: 'Menu',
  components: {
    ProfileButton,
    HomeButton,
    UserSearch,
    Notifications
  }
}
</script>
