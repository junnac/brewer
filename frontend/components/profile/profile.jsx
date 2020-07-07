import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { fetchUser } from '../../actions/user_actions';

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.entities.users[userId]);
  const userGuides = useSelector(state => Object.values(state.entities.guides));
  const favoriteBreweries = useSelector(state => Object.values(state.entities.favorites));

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId]);

  const breweries = !favoriteBreweries ? (
    <h4>No favorite breweries yet.</h4>
  ) : (
    <ul>
      {favoriteBreweries.map(brewery => (
        <Link
          key={brewery.id}
          to={`/breweries/${brewery.id}`}
        >
          {brewery.name}
        </Link>
      ))}
    </ul>
  );

  return (
    <div className="profile">
      <span>
        <div>
          <h1>{user.username}</h1>
          <img src="/beer.svg" alt="" id="profile-pic" />
        </div>

        <div>
          <h2>
            <i className="fa fa-list-ol" />
            Guides
          </h2>
          {userGuides.map(guide => (
            <Link
              to={`/guides/${guide.id}`}
              className="guide-preview"
              key={guide.id}
            >
              <h3>{guide.title}</h3>
            </Link>
          ))}
        </div>
      </span>
      <div className="user-breweries">
        <h2>
          <i className="fa fa-star" />
          Favorite Breweries
        </h2>
        {breweries}
      </div>
    </div>
  );
};

Profile.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Profile;
