import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

class ChooseCity extends Component {
  render() {
    const { props } = this
    const { isFormOpen } = props

    const renderSuggestion = ({ formattedSuggestion }) => (
      <div className="suggestion-item">
        <i className="fa fa-map-marker suggestion-icon" />
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
      input: 'search-input',
      autocompleteContainer: 'autocomplete-container',
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
      <div className={`choose-city ${isFormOpen ? 'active' : ''}`}>
        <div className="wrap">
          <h2>Where you are you?</h2>

          <form onSubmit={props.submitForm}>
            <PlacesAutocomplete
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              classNames={cssClasses}
              onSelect={props.handleSelect}
              onChange={props.handleChange}
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