<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">
      Admin
    </h1>
    <div class="p-2 bg-gray-200">
      <nuxt-link to="/admin/homes/">
        Homes
      </nuxt-link>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  asyncData ({ $config, redirect }) {
    if (!Cookie.get($config.auth.cookieName)) {
      redirect('/no-access/')
    }
  }
}
</script>

<style>

</style>
