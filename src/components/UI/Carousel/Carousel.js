import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import alex from "../../../resources/images/alex.png"
import lizard from "../../../resources/images/lizard.jpg"
import brownsnake from "../../../resources/images/brownsnake2.jpg"
import leopardfrog from "../../../resources/images/leopardfrog.jpg"
import paintedturtle2 from "../../../resources/images/painted1.jpg"
import racerunner from "../../../resources/images/racerunner.jpg"
import styles from "./Carousel.css"

const ReptileCarousel = () => {
    const images = [alex, lizard, brownsnake, leopardfrog, paintedturtle2, racerunner];

    const carousel = images.map(image => {
        return (<Carousel.Item>
                   <img className="carousel-img" src={image}/>
                </Carousel.Item>)
    });
    return (
        <Carousel>
            {carousel}
        </Carousel>
    );
};

export default ReptileCarousel;
