# nuxt-bnb

A fully functional AirBnb clone powered by Nuxt.js.

This project also integrate with third party code from Google Maps, Algolia and Stripe
Deep dive into some of the most ignored problems your app will face in production and perform root-cause analysis to find out what's really going on behind the scenes
- Start with local mock data and build up to full REST API using NodeJS proxy for actions that require elevated privileges
- Geo search page that shows properties in the area
- Property page where user can se property details
- Admin page for managing properties
- Algolia for lighting fast Geo search and data storage
- Stripe for payment
- Cloudinary to upload assets and optimize images for mobile friendly and stays efficient

## [head()](https://vue-meta.nuxtjs.org/api/)
- To avoid any duplication when used in child components, please give a unique identifier with the hid key to the meta description. This way vue-meta will know that it has to [overwrite the default tag](https://nuxtjs.org/docs/2.x/features/meta-tags-seo#local-settings).
- `titleTemplate` for dynamic title 

## [nuxt-link](https://nuxtjs.org/docs/2.x/features/nuxt-components#the-nuxtlink-component)
- Nuxt.js will automagically prefetch the code-splitted pages linked with `<nuxt-link>` when visible in the viewport [by default](https://nuxtjs.org/blog/introducing-smart-prefetching). We can use `no-prefetch` on `<nuxt-link>` or globaly disable it `router: {prefetchLinks: false}` in `nuxt.config.js` to prevent it.

## Modules
- Modules are in the node evironment so the aren't compiled by webpack
- [Modules](https://nuxtjs.org/docs/2.x/directory-structure/modules/)
- [Module Container](https://nuxtjs.org/docs/2.x/internals-glossary/internals-module-container)

## [Nuxt Hooks](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-hooks)

## [Google api](https://console.cloud.google.com)
- Map Javascript API
- Places API
- `defer` download script asynchronously then executed whenever it's ready. All scripts with `defer` are guaranteed to execute in the order they appear. Meanwhile `Nuxt` also uses `defer` on all of `Nuxt's javascript` and put it at bottom of the page. So if we use `defer` to load Google Maps in `<head>` the browser have to wait for the Google Maps to download before it could even start up `Nuxt` and hooks like created, mounted... It's not good for mobile or slow network. That's why we should use `async` here.
- When using third party libraries not supported SSR natively, `script` in `head()` is being appended to the page as many times as the component was loaded. Remember to use `skip` in head.
- [Place autocomplete](https://developers.google.com/maps/documentation/javascript/places-autocomplete)
- [Place types](https://developers.google.com/maps/documentation/places/web-service/supported_types)
- [Style Reference](https://developers.google.com/maps/documentation/javascript/style-reference?hl=en)

## Algolia
- Config `facet` for referncing property
- `attributesToHighlight: []` to reduce payload
- Algolia search [aroundLatLng](https://www.algolia.com/doc/api-reference/api-parameters/aroundLatLng/?client=javascript)

## Lifecyle hooks
- `created` runs on bot server and client
- `mounted` runs on client only

## Route update
- [watchQuery](https://nuxtjs.org/docs/2.x/components-glossary/pages-watchquery/)
- [In-Component Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards)

## Images optimizing
- By default `Nuxt` inline svg image as `base64`. This not only increases the DOM size but also stops you from lazy loading image. It also prevents you from setting the cache lifetime of this asset.
- Set `extractCSS: true` in `nuxt.config.js` to tells `webpack` not to inline all of the CSS but to keep it as a separate CSS file. `loaders: {limit: 0}` means only zero bytes will be inlined. [See doc](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build#extractcss)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
