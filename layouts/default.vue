<template>
  <div class="app">
    <header class="app-header">
      <div class="app-logo">
        <img src="/images/logo.svg">
      </div>
      <div class="app-search">
        <input ref="citySearch" type="text" placeholder="Enter your address" @changed="changed">
        <!-- plugin v-calendar is client only so we need to put inside <client-only> -->
        <client-only>
          <template #placeholder>
            <input class="datepicker">
            <span class="mr-2 -ml-6">to</span>
            <input class="datepicker"><br>
          </template>

          <date-picker
            v-model="range"
            is-range
            timezone="UTC"
            :model-config="{ timeAdjust: '00:00:00'}"
          >
            <template #default="{ inputValue, inputEvents}">
              <input :value="inputValue.start" class="datepicker" v-on="inputEvents.start">
              <span class="mr-2 -ml-6">to</span>
              <input :value="inputValue.end" class="datepicker" v-on="inputEvents.end"><br>
            </template>
          </date-picker>
        </client-only>
        <button @click="search">
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
  data () {
    return {
      location: {
        lat: 0,
        lng: 0,
        label: ''
      },
      range: {
        start: new Date(),
        end: new Date()
      }
    }
  },
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
    search () {
      if (!this.location.label) return
      this.$router.push({
        name: 'search',
        query: {
          ...this.location,
          start: this.range.start.getTime() / 1000,
          end: this.range.end.getTime() / 1000
        }
      })
      // }
    },
    changed (event) {
      const place = event.detail
      if (!place.geometry) return

      this.location.lat = place.geometry.location.lat()
      this.location.lng = place.geometry.location.lng()
      this.location.label = this.$refs.citySearch.value
    }
  }
}
</script>
