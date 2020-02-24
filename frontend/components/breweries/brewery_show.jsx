import React, { useEffect, useState } from 'react';
import Brewery from './brewery_index_item'

class BreweryShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      state: "",
      id: "",
      rating: 0,
      price: "",
      hours: "",
      reviewCount: 0
    };
  }

  componentDidMount() {
    const { fetchBrewery, fetchYelp, fetchYelpInfo, fetchYelpReviews, match } = this.props;

    fetchBrewery(match.params.breweryId)
      .then(res => {
        let place = Object.values(res.brewery)[0].address.split(" ");
        let address = place.slice(0, 3).join(" ");
        let city = place[3];
        let state = place[4][0] + place[5][0];

        this.setState({
          address,
          city,
          state,
        });
      }).then(() => {
        let { address, city, state } = this.state;
        fetchYelp(this.props.brewery.name, address, city, state)
          .then(res => {
            let yelpId = res.yelp.businesses[0].id;
            fetchYelpInfo(yelpId)
              .then(res => {
                let { rating, price, hours, review_count } = res.yelpInfo;
                this.setState({
                  rating,
                  price,
                  hours,
                  reviewCount: review_count
                });
              })
            fetchYelpReviews(yelpId);
          })
      })
  }

  render() {
    const { yelp, brewery, reviews } = this.props;
    const { rating, price, hours, reviewCount } = this.state;

    return yelp.length < 1 ? null : (
      <div className="brewery show">
        <Brewery brewery={brewery} />
        <div className="brewery-yelp">
          <h3>{price}</h3>
          <img src={`/${rating}.png`} className="yelp-stars"/>
          <h3>{reviewCount} reviews</h3>
        </div>
      </div>
    );
  }
}

export default BreweryShow;