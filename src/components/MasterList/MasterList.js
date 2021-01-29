import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import CardList from "../UI/CardList/CardList";
import allActions from "../../actions";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {animated} from "react-spring";
import EntryForm from "../EntryForm/EntryForm";
import EntryFormModal from "../EntryForm/EntryFormModal";

const MasterList = (props) => {
    const dispatch = useDispatch();
    let databaseResult = useSelector(state => state.map.masterList);
    let isAuth = useSelector(state => state.auth.isAuthenticated);
    const [modal, setModal] = useState(null);


    useEffect(() => {
        dispatch(allActions.mapActions.getAllSpecies())
    },
        []);

    const onEdit = (elementData) => {
        console.log(databaseResult)
        console.log(elementData)
        return setModal(<EntryFormModal display={true} data={elementData}/>);
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