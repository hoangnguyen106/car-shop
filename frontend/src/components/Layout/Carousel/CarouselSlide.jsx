/* eslint-disable no-unused-vars */
import { Carousel } from 'antd';
import React from 'react';
import './CarouselSlide.scss';

function CarouselSlide({ data }) {
  console.log('>>>>>>>>>>>>>>>>>>>>>', data);
  const { avatar, pictures } = data;
  const urlImage = [];
  if (pictures.length > 0) {
    pictures.forEach((item) => {
      urlImage.push(`${item.url}`);
      console.log(item.url);
    });
  }
  urlImage.push(`${avatar}`);
  return (
    <Carousel autoplay>
      {
      data && urlImage.map((element) => (
        <div style={{ width: '100%', height: '100%' }}>
          <img key={element._id} src={element} style={{ height: '100%', width: '100%' }} alt="" />
        </div>
      ))
}
    </Carousel>
  );
}

export default CarouselSlide;
