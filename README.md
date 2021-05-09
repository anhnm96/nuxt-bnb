# nuxt-bnb

A fully functional AirBnb clone powered by Nuxt.js.

This project also integrate with third party code from Google Maps, Algolia and Stripe
Deep dive into some of the most ignored problems your app will face in production and perform root-cause analysis to find out what's really going on behind the scenes
- Build REST API using NodeJS proxy for actions that require elevated privileges
- Geo search page that shows properties in the area
- Property page where user can see property details
- Admin page for managing properties
- Algolia for lighting fast Geo search and data storage
- Stripe for payment
- Cloudinary to upload assets and optimize images for mobile friendly and stays efficient

## Drawback of SPA
- The time it takes to render the first page and initialize the app is extensive
- Many search engines cannot render js, though some can render js, it will result in indexing delay
- Not good for social sharing. When you paste a link to your site in Discord, FB, Twitter,... a robot hits your site and fetches the sharing data to render. Those robots don't know how to render js or how to run your app. [Facebok check](https://developers.facebook.com/tools/debug)

## [head()](https://vue-meta.nuxtjs.org/api/)
- To avoid any duplication when used in child components, please give a unique identifier with the hid key to the meta description. This way vue-meta will know that it has to [overwrite the default tag](https://nuxtjs.org/docs/2.x/features/meta-tags-seo#local-settings).
- `titleTemplate: NuxtBnb | %s` and set `head() {title: PAGE_TITLE}` in page routes for dynamic title 

## [nuxt-link](https://nuxtjs.org/docs/2.x/features/nuxt-components#the-nuxtlink-component)
- Nuxt.js will automagically prefetch the code-splitted pages linked with `<nuxt-link>` when visible in the viewport [by default](https://nuxtjs.org/blog/introducing-smart-prefetching). We can use `no-prefetch` on `<nuxt-link>` or globaly disable it `router: {prefetchLinks: false}` in `nuxt.config.js` to prevent it.

## Modules
- Modules are in the node evironment so they aren't compiled by webpack
- [Modules](https://nuxtjs.org/docs/2.x/directory-structure/modules/)
- [Module Container](https://nuxtjs.org/docs/2.x/internals-glossary/internals-module-container)

## [Nuxt Hooks](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-hooks)

## [Google api](https://console.cloud.google.com)
-  All scripts with `defer` are guaranteed to execute in the order they appear. Meanwhile `Nuxt` also uses `defer` on all of `Nuxt's javascript` and put it at bottom of the page. So if we use `defer` to load Google Maps in `<head>` the browser have to wait for the Google Maps to download before it could even start up `Nuxt` and hooks like created, mounted... It's not good for mobile or slow network. That's why we should use `async` here.
- Now that we use `async` to load google script. Remember to check that has been loaded or not because nuxt script may execute it before it's completely loaded if we call it in `created` or `mounted`
- When using third party libraries not supported SSR natively, `script` in `head()` is being appended to the page as many times as the component was loaded. Remember to use `skip` in head.
- [Place autocomplete](https://developers.google.com/maps/documentation/javascript/places-autocomplete)
- [Place types](https://developers.google.com/maps/documentation/places/web-service/supported_types)
- [Style Reference](https://developers.google.com/maps/documentation/javascript/style-reference?hl=en)

## Algolia
- Config `facet` for referencing property
- `attributesToHighlight: []` to reduce payload
- Algolia search [aroundLatLng](https://www.algolia.com/doc/api-reference/api-parameters/aroundLatLng/?client=javascript)


## Lifecyle hooks
- `created` runs on both server and client
- `mounted` runs on client only

## Route update
- [watchQuery](https://nuxtjs.org/docs/2.x/components-glossary/pages-watchquery/)
- [In-Component Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards)

## Images optimizing
- By default `Nuxt` will use `Base64` to inline images in the asset folder if they are under 1000 bytes. This not only increases the DOM size but also stops you from lazy loading image. It also prevents you from setting the cache lifetime of this asset.
- Set `extractCSS: true` in `nuxt.config.js` to tells `webpack` not to inline all of the CSS but to keep it as a separate CSS file. [See doc](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build#extractcss)
- `loaders: {limit: 0}` means only file zero bytes will be inlined.

## [Runtime Config](https://nuxtjs.org/docs/2.x/directory-structure/nuxt-config#runtimeconfig)
- When Nuxt starts up, it will take both of `publicRuntimeConfig` and `privateRuntimeConfig` objects and combine theme. Once for browsers (using only public) and once fore the server (using both public and private). That means `privateRuntimeConfig` is intended for SSR only. We can us it by `this.$config` or `context.$config`
- If we build the app and then update the .env file, the new value is still shown. This is really handy in production because it allows you to have different configs and still use the same build across different evironments. 
- You also can push this even further and create realtime configs using some timers and a module you can actually **update configs** in realtime while the server container is still running! (turn features on & off, update themes, hours of operation,.. without rebuilding)

## Google Authentication 
- [Google Sign-in Documentation](https://developers.google.com/identity/sign-in/web/sign-in)
- [Google + oAuth 2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [GoogleAuth.currentUser.listen(listener) Documentation](https://developers.google.com/identity/sign-in/web/reference#googleauthcurrentuserlistenlistener)
- Add oAuth 2:
1. Go to [console](https://console.developers.google.com/). 
2. Select `Credentials`, click `CREATE CREDENTIALS` -> `OAuth client. ID`.
3. Now choose `Web application` type, input our app name.
4. Add `http://localhost:3000` to `Authorized Javascript origins`. We'll add new domain when deploy the app.
5. Note: in traditional oAuth 2, when we request an authorization token we'd pass a redirect url so that when the user is done logging in, Google would know where to send the user next. `Authorized redirect URIs` would make sure the redirect url passed is authorized. Since we'll be using Google Sign-in button, we don't need any `Redirect Urls`, it just creates a popup on its own.
6. Add plugin to load `gapi` from (Google APIs)[https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams]. (`~/plugins/auth.client.js`)

## [Server Middleware](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware)
- Use `serverMiddleware` to create a server-side firewall where sensitive API calls are protected and proxied to their destinations.
- Whenever the sever gets hit, the browser will automatically pass the id token cookie in the request
- `addServerMiddleware` will adds the handler to the end of the `serverMiddleware` array. We want to make sure our `serverMiddleware` would run first by using hook [render:setupMiddleware](https://nuxtjs.org/docs/2.x/internals-glossary/internals-renderer#hooks)
- [Google API Client](https://developers.google.com/identity/sign-in/web/backend-auth#using-a-google-api-client-library)
### Create user via serverMiddleware
- Go to `algolia` app -> `API Keys` -> `All API Keys` -> `New API Key` -> In ACL box add option `addObject` and `deleteObject` (keep `search` option which is default) -> `Create` -> add to `privateRuntimeConfig` in `nuxt.config.js`.
1. plugin `auth.client.js` load google gapi. When user successfully signed in, set token into cookie, then call`/api/user`
2. `auth` is serverMiddleware for route `/api`. It get cookie from header, verify google token and return user signed in info
3. `algolia` is serverMiddleware for route `/api/user`. It gets user info form req.identity which is set from serverMiddleware `auth`. Get user with that id from `Algolia`. If user doesn't exist, sends request to create user.

## Admin section
- We don't need SSR for admin section. So we need to enable SPA mode for route `/admin`
```js
// modules/auth.js
this.nuxt.hook('render:setupMiddleware', (app) =>{
  app.use('/admin', (req, res, next) => {
    res.spa = true
    next()
  })
})
```
## Cloudinary
- Generating authentication signatures [doc](https://cloudinary.com/documentation/upload_images#generating_authentication_signatures)
- Nodejs [crypto](https://nodejs.org/api/all.html#crypto_crypto_createhash_algorithm_options)
- To add home reference to userId. In algolia, go to `indices/homes` -> facets -> in the `Attributes for faceting`, add `userId`
- `nuxt/image` [module](https://image.nuxtjs.org/api/$img/)
- cloudinary [crop](https://cloudinary.com/documentation/resizing_and_cropping)

## Availability
- In `homes` indices add facets `availability` to enable filter by availability
r5OkePEczeRny3MdhElfmhRd
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
