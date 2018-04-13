import React, { Component } from 'react'

// Components
import Meta from './../components/Meta'
import Footer from './../components/Footer'
import ChooseCity from './../components/ChooseCity'

export default class extends Component {
  constructor(props) {
    super(props)

    this.clock = this.clock.bind(this)
    this.harold = this.harold.bind(this)
    this.handleCity = this.handleCity.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.submitForm = this.submitForm.bind(this)

    this.state = {
      // clock
      time: '',
      isAm: '',
      isDay: true,

      // form
      city: ''
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

      this.setState({ isAm: false })

      if (hours < 6)
        this.setState({ isDay: true })
      else
        this.setState({ isDay: false })
    } else {
      this.setState({ isAm: true })

      if (hours >= 6 || hours == 12)
        this.setState({ isDay: true })
      else
        this.setState({ isDay: false })
    }

    let time = `${this.harold(hours)}:${this.harold(minutes)}:${this.harold(seconds)}`
    this.setState({ time })

    if (this.state.isDay) {
      document.body.classList.remove('night')
      document.body.classList.add('day')
    } else {
      document.body.classList.remove('day')
      document.body.classList.add('night')
    }
  }

  harold(num) {
    return (num < 10) ? '0' + num : num
  }

  handleCity(city) {
    this.setState({ city })
  }

  submitForm(e) {
    e.preventDefault()
  }

  handleSelect(city) {
    this.setState({ city })
  }

  componentDidMount() {
    setInterval(() => this.clock(), 1000)
  }

  render() {
    const { time, isAm, city } = this.state

    return (
      <div>
        <Meta />

        <main className={(typeof isAm == 'boolean') ? 'active' : ''}>
          <ChooseCity
            city={city}
            handleCity={this.handleCity}
            handleSelect={this.handleSelect}
            submitForm={this.submitForm} />

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