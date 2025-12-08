import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img01 from '../assets/asset_01.jpg';
import img02 from '../assets/asset_02.jpg';
import img03 from '../assets/asset_03.jpg';

const Banner = () => {
    return (
             <Carousel autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={img01} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={img02} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={img03} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
    );
};

export default Banner;