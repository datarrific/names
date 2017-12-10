import React from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

export default class NameMap extends React.Component {
  constructor() {
    super()

    this.state = {
      map: null
    }
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGF0YXJpZmZpYyIsImEiOiJjamF6ajVtNGMwbnFvMnduMjRib2p3ZDhsIn0.vCAR2WQrwxRPisWy7gTgpQ';
    var map = new mapboxgl.Map({
      container: 'name-map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [13.2846504, 52.5069704],
      zoom: 10,
    })

    map.on("load", () => {
      map.addLayer({
        "id": "districts",
        "source": {
          type: "geojson",
          data: "https://api.mapbox.com/datasets/v1/datariffic/cjazl0x06878o2xr1r0cznmxo/features?access_token=pk.eyJ1IjoiZGF0YXJpZmZpYyIsImEiOiJjamF6ajVtNGMwbnFvMnduMjRib2p3ZDhsIn0.vCAR2WQrwxRPisWy7gTgpQ",
        },
        "type": "line"
      })
    })

    this.setState({ map })
  }

  render() {
    return <div>
      <div id="name-map" />
    </div>
  }
}


