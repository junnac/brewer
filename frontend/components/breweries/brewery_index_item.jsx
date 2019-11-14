import React from 'react';
import { Link } from 'react-router-dom';

class Brewery extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.brewery.id === '') {
      this.brewery = this.props.breweries[this.props.breweryId]
    } else {
      this.brewery = this.props.brewery
    }
  }

  render() {
    if (this.props.brewery === undefined) return null;

    const brewery = this.brewery
    const addressLink = brewery.address.split(" ").join("+")
    return (
      <div>
        <h1>
          <a href={brewery.website} target="_blank">
            {brewery.name}
          </a>
        </h1>
        <h2>
          {brewery.address}
        </h2>
        <img src={brewery.photoUrl} className="brewery-photo" />
        <p>{brewery.description}</p>
        <a href={`https://www.google.com/maps/place/${addressLink}/`} target="_blank"><button className="gmap-link">
          Open in Google Maps
        </button></a>
      </div>
    )
  }
}

Brewery.defaultProps = {
  brewery: {
    id: '',
    name: "",
    lat: '',
    lng: '',
    address: "",
    website: "",
    description: "",
    cityId: ''
  }
}

export default Brewery;