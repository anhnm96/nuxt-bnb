export default function (context, inject) {
  let mapLoaded = false
  let mapWaiting = null

  addScript()
  inject('maps', {
    showMap
  })

  function addScript () {
    console.log('add script')
    const script = document.createElement('script')
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC3PNdLZKi8aTbvGVXHSfjcXFP2p2DBP_k&libraries=places&callback=initMap'
    script.async = true
    window.initMap = initMap
    document.head.appendChild(script)
  }

  function initMap () {
    mapLoaded = true
    if (mapWaiting) {
      const { canvas, lat, lng } = mapWaiting
      renderMap(canvas, lat, lng)
      mapWaiting = null
    }
  }

  function showMap (canvas, lat, lng) {
    console.log('show map')
    if (mapLoaded) renderMap(canvas, lat, lng)
    else mapWaiting = { canvas, lat, lng }
  }

  function renderMap (canvas, lat, lng) {
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true
    }
    const map = new window.google.maps.Map(canvas, mapOptions)
    const position = new window.google.maps.LatLng(lat, lng)
    const marker = new window.google.maps.Marker({ position })
    marker.setMap(map)
  }
}
