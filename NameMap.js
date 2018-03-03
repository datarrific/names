import React from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

import config from './config'

const NAMES_API = `https://api.mapbox.com/datasets/v1/datariffic/cjazlnc6i223u33n0oa4dx0gm/features?access_token=${config.accessToken}`
const DISTRICTS_API = `https://api.mapbox.com/datasets/v1/datariffic/cjazl0x06878o2xr1r0cznmxo/features?access_token=${config.accessToken}`

export default class NameMap extends React.Component {
  constructor() {
    super()

    this.state = {
      map: null,
      names: []
    }
  }

  componentDidMount() {
    fetch(NAMES_API)
      .then(response => response.json())
      .then(data => this.setState({ names: data.features }));

    mapboxgl.accessToken = config.accessToken;
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
          data: DISTRICTS_API,
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


