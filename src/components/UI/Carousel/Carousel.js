import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import alex from "../../../resources/images/alex.png"
import lizard from "../../../resources/images/lizard.jpg"
import brownsnake from "../../../resources/images/brownsnake2.jpg"
import leopardfrog from "../../../resources/images/leopardfrog.jpg"
import paintedturtle2 from "../../../resources/images/painted1.jpg"
import racerunner from "../../../resources/images/racerunner.jpg"
import styles from "./Carousel.css"
//asdasdasdasd

const ReptileCarousel = () => (
    <Carousel>
        <Carousel.Item>
            <img src={alex}/>
            <Carousel.Caption><p>Painted Turtle</p></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img src={lizard}/>
            <Carousel.Caption><p>Common Five-lined Skink</p></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img src={brownsnake}/>
            <Carousel.Caption><p>Brownsnake</p></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img src={leopardfrog}/>
            <Carousel.Caption><p>Leopard Frog</p></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img src={paintedturtle2}/>
            <Carousel.Caption><p>Painted Turtle</p></Carousel.Caption>
        </Carousel.Item>
        < Carousel.Item>
            < img src={racerunner}/>
            <Carousel.Caption><p>Six-lined Racerunner</p></Carousel.Caption>
        </Carousel.Item>
    </Carousel>
);

export default ReptileCarousel;
