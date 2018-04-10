import React, { Component } from 'react'
import geolocation from 'geolocation'

// Components
import Meta from '../components/Meta'
import Footer from '../components/Footer'

export default class extends Component {
  constructor(props) {
    super(props)

    this.clock = this.clock.bind(this)
    this.harold = this.harold.bind(this)
    this.handleAm = this.handleAm.bind(this)
    this.setCoords = this.setCoords.bind(this)

    this.state = {
      time: '',
      isAm: '',
      coords: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  clock() {
    // based on clock experiment https://codepen.io/uniqname/pen/eIApt?editors=0010

    let d = new Date(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds()

    if (hours > 12) {
      hours = hours - 12

      if (hours == 12)
        this.handleAm(true)
      else
        this.handleAm(false)
    } else
      this.handleAm(true)

    let time = `${this.harold(hours)}:${this.harold(minutes)}:${this.harold(seconds)}`
    this.setState({ time })
  }

  harold(num) {
    return (num < 10) ? '0' + num : num
  }

  handleAm(isAm) {
    if (typeof this.state.isAm === 'boolean') return

    this.setState({ isAm })
    document.body.classList.add(this.state.isAm ? 'day' : 'night')
  }

  componentDidMount() {
    if (navigator.geolocation)
      geolocation.getCurrentPosition((err, position) => {
        if (err) throw err
        console.log('aAAAAAAAAAAAAAAAAA')
        this.setCoords(position.coords)
      })

    setInterval(() => this.clock(), 1000)
  }

  setCoords(coords) {
    this.setState({
      coords: {
        latitude: coords.latitude,
        longitude: coords.longitude
      }
    })
  }

  render() {
    const { time, isAm } = this.state

    return (
      <div>
        <Meta />

        <main className={(typeof isAm == 'boolean') ? 'active' : ''}>
          <h1 className="current-weather">🌞</h1>
          <p className="description">
            <span>Sunny</span>, {time}{isAm ? 'am' : 'pm'}
          </p>
        </main>

        <Footer />
      </div>
    )
  }
}