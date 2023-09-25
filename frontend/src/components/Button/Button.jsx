/* eslint-disable react/button-has-type */
import React from 'react';
import './Button.scss';

function Button({
  className, onClick, title, type,
}) {
  console.log(className, onClick, title);
  return (
    <>
      <button className={className} onClick={onClick} type={type}>
        {title}
      </button>
    </>
  );
}

export default Button;
