import React, {useState} from "react";
import InfoCard from "../InfoCard/InfoCard";
import * as Constants from "../../../resources/constants/Constants";
import Collapsible from "react-collapsible";
import classes from "./CardList.css";

const CardList = (props) => {
    const list = [];
    console.log(props.data)
    //Reptiles
    for (const Category of Constants.ReptileCategories) {
        const CategoryResult = props.data.filter(Species => Species[1].countyData.category === Category);

        const ListItem = {
            categoryName: Category,
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
            categoryName: Category,
            species: CategoryResult
        };

        if (CategoryResult.length > 0) {
            list.push(ListItem);
        }
    }

    //No Category Set
    const CategoryResult = props.data.filter(Species => Species[1].countyData.category === undefined);

    const ListItem = {
        categoryName: "No Category",
        species: CategoryResult
    };

    if (CategoryResult.length > 0) {
        list.push(ListItem);
    }

    return (
        <div>
            {list.map(category => {
                return (<Collapsible className="CardList-Title" openedClassName="CardList-Title"
                                     trigger={category.categoryName + '  +'} triggerWhenOpen={category.categoryName + '  -'} open={true}
                                     transitionTime={300}
                                     key={category.categoryName}>
                    {category.species.map(species => {
                        return (
                            <InfoCard data={{elementID: species[0], ...species[1].countyData}} key={species[0]}
                                onEdit={props.onEdit} onDelete={props.onDelete}
                            />
                        )
                    })}
                </Collapsible>)
            })}
        </div>
    );

};

export default CardList;