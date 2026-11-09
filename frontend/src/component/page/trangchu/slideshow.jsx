import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AutoPlay() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 10,
    cssEase: "ease-in-out"
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div style={{width:'90%',
                      height:'40%',
        }}>
         <img src="/images/banner/banner11.jpg" alt="" style={{
      width: "100%",
      objectFit: "cover",
      display: "block",
    }} />
        </div>
        <div style={{width:'90%',
                      height:'40%',
        }}>
         <img src="/images/banner/banner11.jpg" alt="" style={{
      width: "100%",
      objectFit: "cover",
      display: "block",
    }} />
        </div>
        <div style={{width:'90%',
                      height:'40%',
        }}>
         <img src="/images/banner/banner11.jpg" alt="" style={{
      width: "100%",
      objectFit: "cover",
      display: "block",
    }} />
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;
