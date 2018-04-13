import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class ChooseCity extends Component {
  render() {
    const { props } = this

    const renderSuggestion = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className="fa fa-map-marker Demo__suggestion-icon" />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>
    )

    const inputProps = {
      type: 'text',
      value: props.city,
      onChange: props.handleCity,
      autoFocus: true,
      placeholder: 'search for a city...'
    }

    const cssClasses = {
      root: 'form-group',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container',
    }

    const onError = (status, clearSuggestions) => {
      console.log(
        'Error happened while fetching suggestions from Google Maps API',
        status
      )

      clearSuggestions()
    }

    const shouldFetchSuggestions = ({ value }) => value.length > 2

    return (
      <div className="choose-city">
        <div className="wrap">
          <h2>Where you are you?</h2>

          <form onSubmit={props.submitForm}>
            <PlacesAutocomplete
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              classNames={cssClasses}
              onSelect={props.handleSelect}
              onEnterKeyDown={props.handleSelect}
              onError={onError}
              shouldFetchSuggestions={shouldFetchSuggestions}
            />

            {/* <input
              onChange={props.handleCity}
              type="text"

              placeholder="search for a city..." /> */}

            <button type="submit">Go</button>
          </form>
        </div>
      </div>
    )
  }
}

export default ChooseCity