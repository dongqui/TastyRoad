import React from 'react';
import './SearchListItem.css';

const SearchListItem = (props) => {
    const { place_name, address_name } = props.data;

    return (
      <li className="place-search-list" onClick={() => props.setSelectedPlace(props.data)}>
        <h5>{place_name}</h5>
        <span>{address_name}</span>
      </li>
    )
};

export default SearchListItem;