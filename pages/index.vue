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
export default {
  async asyncData ({ $dataApi }) {
    return {
      homes: (await $dataApi.getHomes()).json.hits
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
