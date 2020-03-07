import regeneratorRuntime from "regenerator-runtime";
import React, { useState, useEffect } from 'react';
import Brewery from './brewery_index_item';
import Review from './review';
import Loading from '../loading';

const DAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
]

const BreweryShow = ({
  fetchBrewery,
  fetchYelp,
  fetchYelpInfo,
  fetchYelpReviews,
  clearYelp,
  match,
  brewery,
  yelp,
  reviews
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchBreweryShowInfo() {
      await clearYelp();
      
      const res = await fetchBrewery(match.params.breweryId);
      const { name, address, city, state } = Object.values(res.brewery)[0];
      let streetAddress = address.split(",")[0];
      
      const result = await fetchYelp(name, streetAddress, city, state);
      const yelpResult = result.yelp.businesses[0];

      setIsLoading(false);

      if (yelpResult !== undefined) {
        const yelpId = yelpResult.id;
        fetchYelpInfo(yelpId);
        fetchYelpReviews(yelpId);
      }
    }

    fetchBreweryShowInfo();
  }, [match.params.breweryId]);

  const reverse = str => {
    let newStr = "";
    for (let i = str.length - 1; i >= 0; i--) {
      newStr += str[i];
    }
    return newStr;
  }

  const formatTime = time => {
    const timeStr = reverse(time);
    const hours = reverse(timeStr.slice(2));
    const minutes = reverse(timeStr.slice(0,2));

    return `${hours}:${minutes}`;
  }

  const yelpSection = () => {
    if (!yelp || reviews.length === 0) {
      return null;
    } else {
      const { price, hours } = yelp;

      const openMessage = i => {
        let currentDay = new Date().getDay() - 1
        if (hours[0].is_open_now && currentDay === i)
          return "Open now";
      };

      return (
        <div className="brewery-yelp">
          <h3>Price Range: {price}</h3>

          <table className="table-center">
            <tbody>
              {hours[0].open.map((hours, i) =>  {

                const startInt = parseInt(hours.start);
                const endInt = parseInt(hours.end);
                let openTime = hours.start;
                let closeTime = hours.end;

                if (startInt > 1200) {
                  openTime = formatTime((startInt - 1200).toString());
                }

                if (parseInt(hours.end) > 1200) {
                  closeTime = formatTime((endInt - 1200).toString());
                }

                return (
                  <tr key={i}>
                    <th>{DAYS[i]}</th>
                    <td>{openTime} - {closeTime}</td>
                    <td className="open">{openMessage(i)}</td>
                  </tr>
              )})}
            </tbody>
          </table>

          {yelpReviewsSection()}
        </div>
      );
    }
  }

  const yelpReviewsSection = () => {
    const { rating, reviewCount, url } = yelp;

    return (
      <div className="brewery-yelp">
        <h3>{reviewCount} reviews</h3>
        <a href={url} alt={url} target="_blank">
          <img src={`/${rating}.png`} className="yelp-stars" />
        </a>

        {reviews.map((review, i) => (
          <Review review={review} key={i} />
        ))}
      </div>
    );
  }



  return isLoading ? <Loading /> : (
    <div className="brewery show">
      <Brewery brewery={brewery} />
      {yelpSection()}
      {yelpReviewsSection()}
    </div>
  );
};

export default BreweryShow;