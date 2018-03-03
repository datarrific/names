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
      layer: null,
      names: {},
    }
  }

  initializeMap(cb) {
    mapboxgl.accessToken = config.accessToken

    const map = new mapboxgl.Map({
      container: 'name-map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [13.2846504, 52.5069704],
      zoom: 10,
    })

    map.on("load", () => {
      map.addLayer({
        "id": "districts",
        "source": {
          "type": "geojson",
          "data": DISTRICTS_API,
        },
        "type": "line"
      })

      this.setState({ map }, cb)
    })
  }

  fetchNames() {
    fetch(NAMES_API)
      .then(response => response.json())
      .then((data) => {
        this.setState({ names: data, layer: "top-names" }, () => {
          this.setLayer("top-names")
        })
      })
  }

  filterNames(filter) {
    var filtered = {
      "type": "FeatureCollection",
      "features": [
        this.state.names.features[Math.floor(Math.random() * this.state.names.features.length)]
      ],
    }

    filtered.features[0].geometry.coordinates = [13.41861, 52.49887]

    return filtered
  }

  setLayer() {
    this.state.map.addLayer({
      "id": "top-names",
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": this.filterNames("top-names"),
      },
      "layout": {
        "icon-image": "harbor-15",
        "text-field": "{firstname} ({count})",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top",
      }
    })
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if(nextState.layer !== this.state.layer) {
  //     this.setLayer(nextState.layer)
  //   }
  // }

  componentDidMount() {
    this.initializeMap( () => {
      this.fetchNames()
    })
  }

  render() {
    return <div>
      <div id="name-map" />
    </div>
  }
}


