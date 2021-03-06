import React, {useState} from "react";
import classes from "./InfoCard.css";
import Button from "react-bootstrap/Button";
import Media from "react-media";
import {Modal} from "react-bootstrap";
import {useSpring, animated} from 'react-spring'

const InfoCard = (props) => {
    const [displayModal, setDisplayModal] = useState(false);

    const toggleModal = () => {
        setDisplayModal(!displayModal);
    };
    const prop = useSpring({opacity: 1, from: {opacity: 0}});

    return (
        <animated.div style={prop} className="card-layout">
            {displayModal ?
                <Modal show={displayModal} onHide={toggleModal}>
                        <div className="modal-body card-modal" style={{backgroundColor: "#282c34"}}>
                            <button className="close text-white" onClick={toggleModal}>&times;</button>

                            <img className="modalImage" src={props.data.image} placeholder="Image"/>

                            <div className="card-info">
                                <div>
                                    <h4>{props.data.species}</h4>
                                    <h6 className="font-italic">{props.data.scientificName}</h6>
                                    <p style={{
                                        height: "20%",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden"
                                    }}>{props.data.description}</p>
                                    <Button variant="success" className="card-btn" onClick={() => {
                                        window.location.href = props.data.link
                                    }}>Read More</Button>
                                </div>
                            </div>
                        </div>
                </Modal>
                :
                null
            }
            <img className="cardImage" src={props.data.image} placeholder="Image"/>
            <div className="card-info" style={{paddingTop: "0px"}}>
                <div>
                    <h4>{props.data.species}</h4>
                    <p id="info-card-text" className="info-card-text" style={{fontSize: "16px"}}>{props.data.description}</p>
                </div>
            </div>
            <Button variant="success" className="card-btn" onClick={toggleModal}>More</Button>

            {/*optional edit button if a edit function was passed*/}
            {props.onEdit != null ?
                <div>
                    <Button className="controlButton" variant="success" style={{marginRight: "5px"}} onClick={() => {
                        props.onEdit(props.data)
                    }}>Edit</Button>
                </div>
                :
                null
            }

            {/*optional delete button if a delete function was passed*/}
            {props.onDelete != null ?
                <div>
                    <Button className="controlButton" variant="danger" onClick={() => {
                        props.onDelete(props.data)
                    }}>Delete</Button>
                </div>
                :
                null
            }
        </animated.div>
    );
};

export default InfoCard;
