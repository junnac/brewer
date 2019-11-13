import React from 'react';
import Brewery from './brewery_index_item';
import Map from '../map/map';

class BreweryIndex extends React.Component {
  componentDidMount() {
    this.props.fetchBreweries();
  }

  render() {
    return (
      <section className="brewery-index">
        <div className="brewery-index-list">
          {this.props.breweries.map((brewery, i) => (
            <div key={i} className="brewery">
              <Brewery
                breweryId={brewery.id}
                brewery={brewery}
                fetchBrewery={this.props.fetchBrewery}
              />
            </div>
          ))}
        </div>
        <Map places={this.props.breweries} />
      </section>
    )
  }
}


export default BreweryIndex;