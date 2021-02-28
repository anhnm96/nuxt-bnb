<template>
  <div class="container">
    <div v-for="home in homes" :key="home.objectID" style="float: left;margin: 10px">
      <nuxt-link :to="`/home/${home.objectID}`" no-prefetch>
        <home-card :home="home" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import homes from '~/data/homes.json'
export default {
  data () {
    return {
      homes: homes.slice(0, 3)
    }
  },
  head () {
    return {
      title: 'HomePage'
      // meta: [
      //   { name: 'description', content: 'This is a homepage!', hid: 'description' }
      // ]
    }
  }
}
</script>

<style>

</style>
