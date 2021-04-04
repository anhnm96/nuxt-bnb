<template>
  <div class="app">
    <header class="app-header">
      <div class="app-logo">
        <img src="/images/logo.svg">
      </div>
      <div class="app-search">
        <input ref="citySearch" type="text" placeholder="Enter your address" @changed="changed">
        <input type="text" class="datepicker" placeholder="Check in">
        <input type="text" class="datepicker" placeholder="Check out">
        <button>
          <img src="/images/icons/search.svg">
        </button>
      </div>
      <div class="app-user-menu">
        <template v-if="isLoggedIn">
          <img src="/images/icons/house.svg">
          <div class="name">
            Host
          </div>
          <img :src="user.profileUrl" class="avatar">
        </template>
        <div v-show="!isLoggedIn" id="googleButton" class="ml-8" />
      </div>
    </header>
    <nuxt />
  </div>
</template>
<script>
export default {
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    isLoggedIn () {
      return this.$store.state.auth.isLoggedIn
    }
  },
  mounted () {
    this.$maps.makeAutoComplete(this.$refs.citySearch)
  },
  methods: {
    changed (event) {
      const place = event.detail
      if (!place.geometry) return
      this.$router.push({
        name: 'search',
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: this.$refs.citySearch.value
        }
      })
    }
  }
}
</script>
<style>

</style>
