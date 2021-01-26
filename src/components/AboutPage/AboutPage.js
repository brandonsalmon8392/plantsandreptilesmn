import React, {Component} from "react";
import Carousel from "../UI/Carousel/Carousel";
import Slide from "react-reveal";
import online_shopping from "../../resources/images/online_shopping.png";
import solving_problems from "../../resources/images/solving_problems.png";
import work_from_home from "../../resources/images/work_from_home.png";
import bench from "../../resources/images/bench_relaxing.png";
import classes from './AboutPage.css';

const aboutPage = () => {
    return (
        <div className="App-header container col-xl-11">
            <h1 style={{margin: "0 auto", color: "#74B266", marginBottom: "34px"}}>Help Preserve the Wildlife of
                Minnesota</h1>
            <Carousel/>
            <div className="card-deck medium-padding" style={{marginTop: "15%"}}>
                <Slide left>
                    <div className="card text-center border-0" style={{backgroundColor: "#282c34"}}>
                        <img className="card-img-top" src={solving_problems}/>
                        <a href="https://mnherpsoc.org/mn-herps/" className="info-card-link text-decoration-none">Get
                            involved with the
                            Minnesota
                            Herpetological
                            Society </a><br/>
                    </div>
                </Slide>
                <Slide bottom>
                    <div className="card text-center border-0" style={{backgroundColor: "#282c34"}}>
                        <img className="card-img-top" src={work_from_home}/>
                        <a href="https://www.dnr.state.mn.us/nr/index.html"
                           className="info-card-link text-decoration-none">Learn
                            more about
                            Minnesota
                            regulations</a><br/>
                    </div>
                </Slide>
                <Slide right>
                    <div className="card text-center border-0" style={{backgroundColor: "#282c34"}}>
                        <img className="card-img-top" src={online_shopping}/>
                        <a href="https://www.prairiemoon.com/" className="info-card-link text-decoration-none">Shop
                            local
                            plants</a>
                    </div>
                </Slide>
            </div>
            <div className="col-xs-12" style={{height:"40vh"}}/>
            <div className="row medium-padding">
                <div className="col-lg-6 m-auto">
                    <h1>What you can do</h1>
                    <p className="lead">Many reptile populations are on the decline in Minnesota, it's important
                        that we
                        act now to ensure
                        that we can preserve these amazing animals and biodiversity of our state</p>
                </div>
                <img className="col-lg-6" src={bench}/>
            </div>
            <div className="col-xs-12" style={{height:"30vh"}}/>
            <div className="row mb-4 medium-padding">
                <p className="col-md-8 text-sm-left call-to-action-text">By participating and making your voice heard
                    you can help conserve and
                    protect the many species
                    of Minnesota</p>
                <br/>
                <div className="col-md-4 m-auto">
                    <a className="btn btn-lg btn-success btn-block" href="#" role="button">Learn more</a>
                </div>
            </div>
        </div>
    );
};


export default aboutPage