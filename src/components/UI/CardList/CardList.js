import React, {useState} from "react";
import InfoCard from "../InfoCard/InfoCard";
import ReptileCategories from "../../../resources/constants/Constants";
import Collapsible from "react-collapsible";

const CardList = (props) => {
    const list = [];
    const [renderList, setRenderList] = useState(null);


    //Reptiles
    for (const Category of ReptileCategories) {
        const CategoryResult = props.data.filter(Species => Species[1].countyData.category === Category);

        const ListItem = {category: Category,
                          species: CategoryResult};

        if(CategoryResult.length > 0) {
            list.push(ListItem);
        }
    }

    //Plants



    //No Category Set
    const CategoryResult = props.data.filter(Species => Species[1].countyData.category === undefined);

    const ListItem = {category: "No Category",
        species: CategoryResult};

    if(CategoryResult.length > 0) {
        list.push(ListItem);
    }

    setRenderList(list.map(item => {
            return (<Collapsible trigger={item.category} open={true} key={item.category}>
                {item.species.map(cardItem => {
                    return (
                        <InfoCard data={{elementID: cardItem[0], ...cardItem[1].countyData}} key={cardItem[0]}/>
                    )
                })}
            </Collapsible>)
        }));

    return (
        <div>
        {renderList}
        </div>
    );

};

export default CardList;