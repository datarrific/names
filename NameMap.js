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
      style: 'mapbox://styles/mapbox/light-v9'
    })
    this.setState({ map })
  }

  render() {
    return <div>
      <div id="name-map" />
    </div>
  }
}


