import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import CardList from "../UI/CardList/CardList";
import allActions from "../../actions";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {animated} from "react-spring";
import EntryForm from "../EntryForm/EntryForm";

const MasterList = (props) => {
    const dispatch = useDispatch();
    let databaseResult = useSelector(state => state.map.masterList);
    let isAuth = useSelector(state => state.auth.isAuthenticated);
    const [displayModal, setDisplayModal] = useState(true);
    const [modal, setModal] = useState(null);

    const toggleModal = () => {
        setDisplayModal(!displayModal);
    };
    useEffect(() => {
        dispatch(allActions.mapActions.getAllSpecies())
    },
        []);

    const onEdit = (elementData) => {
        console.log(databaseResult)
        console.log(elementData)
        setModal(displayModal ?
                <Modal show={displayModal} onHide={toggleModal}>
                    <div className="modal-body card-modal" style={{backgroundColor: "#282c34"}}>
                        <EntryForm data={elementData}/>
                    </div>
                </Modal>
                :
                null
        )
    };

    const onDelete = (elementData) => {
        dispatch(allActions.mapActions.removeCountyData(elementData));
        dispatch(allActions.mapActions.getAllSpecies());
    };

    return (

        <div className="App-header w-100">
            <h1 className="title">Explore</h1>
            <div id="container">
                {modal}

                {databaseResult != null  ?
                    isAuth ?  <CardList data={[...databaseResult.data]} onEdit={onEdit} onDelete={onDelete}/> : <CardList data={[...databaseResult.data]}/>
                    : null}

            </div>

        </div>

    );
};

export default MasterList;