import React from "react";
import classes from "./infoCard.css";
import Button from "react-bootstrap/Button";

const InfoCard = (props) => {
    return (
        <div className="card-layout">
            <div>
                <img className="cardImage" src={props.data.image} placeholder="Image"/>
            </div>
            <div className="card-info">
                <div className={classes.cardContainer}>
                    <h4>{props.data.species}</h4>
                    <p style={{fontSize: "16px"}}>{props.data.description}</p>
                    <Button variant="success" className="card-btn" onClick={() => {
                        window.location.href = props.data.link
                    }}>More Info</Button>
                </div>
            </div>

            {props.onEdit != null ?
                <div className="controlButton">
                    <Button variant="success" style={{marginRight: "5px"}} onClick={() => {
                        props.onEdit(props.data)
                    }}>Edit</Button>
                </div>
                :
                null
            }

            {props.onDelete != null ?
                <div className="controlButton">
                    <Button variant="danger" onClick={() => {
                        props.onDelete(props.data)
                    }}>Delete</Button>
                </div>
                :
                null
            }

        </div>
    );
};

export default InfoCard;