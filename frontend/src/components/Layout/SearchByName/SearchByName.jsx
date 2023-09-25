import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './SearchByName.scss';

function SearchByName({ value, ref, onChange }) {
  console.log(value, ref, onChange);
  return (
    <div className="content-box">
      <button type="button" className="content-btnSearch">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <input
        style={{ width: '100%', height: '100%' }}
        ref={ref}
        onChange={onChange}
        value={value}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchByName;
