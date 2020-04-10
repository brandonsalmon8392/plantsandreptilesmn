import React from "react";
import { Carousel } from "react-responsive-carousel";
import alex from "../../../resources/images/alex.png"
import lizard from "../../../resources/images/lizard.jpg"
import brownsnake from "../../../resources/images/brownsnake2.jpg"
import leopardfrog from "../../../resources/images/leopardfrog.jpg"
import paintedturtle2 from "../../../resources/images/painted1.jpg"
import racerunner from "../../../resources/images/racerunner.jpg"
export default () => (
    <Carousel autoPlay>
        <div>
            <img src={alex} />
            <p className="legend">Painted Turtle</p>
        </div>
        <div>
            <img src={lizard} />
            <p className="legend">Common Five-lined Skink</p>
        </div>
        <div>
            <img src={brownsnake} />
            <p className="legend">Brownsnake</p>
        </div>
        <div>
            <img src={leopardfrog} />
            <p className="legend">Leopard Frog</p>
        </div>
        <div>
            <img src={paintedturtle2} />
            <p className="legend">Painted Turtle</p>
        </div>
        <div>
        <img src={racerunner} />
        <p className="legend">Six-lined Racerunner</p>
    </div>


    </Carousel>
);
