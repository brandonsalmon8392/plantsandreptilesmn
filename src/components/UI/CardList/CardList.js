import React, {useState} from "react";
import InfoCard from "../InfoCard/InfoCard";
import * as Constants from "../../../resources/constants/Constants";
import Collapsible from "react-collapsible";
import classes from "./CardList.css";

const CardList = (props) => {
    const list = [];

    //Reptiles
    for (const Category of Constants.ReptileCategories) {
        const CategoryResult = props.data.filter(Species => Species[1].countyData.category === Category);

        const ListItem = {
            category: Category,
            species: CategoryResult
        };

        if (CategoryResult.length > 0) {
            list.push(ListItem);
        }
    }

    //Plants
    for (const Category of Constants.PlantCategories) {
        const CategoryResult = props.data.filter(Species => Species[1].countyData.category === Category);

        const ListItem = {
            category: Category,
            species: CategoryResult
        };

        if (CategoryResult.length > 0) {
            list.push(ListItem);
        }
    }

    //No Category Set
    const CategoryResult = props.data.filter(Species => Species[1].countyData.category === undefined);

    const ListItem = {
        category: "No Category",
        species: CategoryResult
    };

    if (CategoryResult.length > 0) {
        list.push(ListItem);
    }

    return (
        <div>
            {list.map(item => {
                return (<Collapsible className="CardList-Title" openedClassName="CardList-Title"
                                     trigger={item.category + '  +'} triggerWhenOpen={item.category + '  -'} open={true}
                                     transitionTime={300}
                                     key={item.category}>
                    {item.species.map(cardItem => {
                        return (
                            <InfoCard data={{elementID: cardItem[0], ...cardItem[1].countyData}} key={cardItem[0]}/>
                        )
                    })}
                </Collapsible>)
            })}
        </div>
    );

};

export default CardList;