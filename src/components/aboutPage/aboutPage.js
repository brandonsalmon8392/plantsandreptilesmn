import React, {Component} from "react";
import Carousel from "../UI/Carousel/Carousel";

class aboutPage extends Component {

    render() {
        return (
            <div className="App-header position-absolute w-100">
                <h1 style={{margin: "0 auto", color: "#74B266", marginBottom: "34px"}}>Help Preserve the Wildlife of
                    Minnesota</h1>
                <Carousel/>
                <div className="row display-row" style={{marginTop: "15%"}}>
                    <div className="card col-2 card-extra" style={{backgroundColor: "#3d3d43", marginLeft: "10%"}}>
                        <a href="https://mnherpsoc.org/mn-herps/" className="App-link">Get involved with the Minnesota
                            Herpetological
                            Society </a><br/>
                    </div>
                    <div className="card col-2 card-extra" style={{backgroundColor: "#3d3d43", marginLeft: "15%"}}>
                        <a href="https://www.dnr.state.mn.us/nr/index.html" className="App-link">Learn more about
                            Minnesota
                            regulations</a><br/>
                    </div>
                    <div className="card col-2 card-extra" style={{backgroundColor: "#3d3d43", marginLeft: "15%"}}>
                        <a href="https://www.prairiemoon.com/" className="App-link">Shop local plants</a>
                    </div>
                </div>
                <div className="jumbotron"
                     style={{backgroundColor: "#3d3d43", display: "flex", flexDirection: "column", margin: "10vh"}}>
                    <h1 className="display-4">What you can do</h1>
                    <p className="lead">Many reptile populations are on the decline in Minnesota, it's important that we
                        act now to ensure
                        that we can preserve these amazing animals and biodiversity of our state</p>
                </div>
                <div className="jumbotron"
                     style={{backgroundColor: "#3d3d43", display: "flex", flexDirection: "column", margin: "10vh"}}>
                    <hr className="my-4"></hr>
                    <p>By participating and making your voice heard you can help conserve and protect the many species
                        of Minnesota</p>
                    <br/>
                    <a className="btn btn-success btn-lg" href="#" role="button">Learn more</a>
                </div>

            </div>
        );
    }
}

export default aboutPage