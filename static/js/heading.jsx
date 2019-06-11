"use-strict";
import React from "react";
import '../css/heading.css';

class Heading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getHeading();
    }   
    
    getHeading() {
        fetch(this.props.heading)
        .then(response => response.json())
        .then(data => {
            this.setState({
                data: data
            })
        });
    }

    render() {
        const heading = this.state.data;
        const size = this.props.size;
        const filter = this.props.filter;
        if (size == 'h3') {
            return (
                <div id="heading">
                   <h3> {heading} </h3>
                </div>
            ) 
        } else if (size == 'h4') {
            return (
                <div id="heading">
                   <h2> {heading} </h2>
                </div>
            )
        } else if (size == 'h2' && filter == 'emotion') {
            return (
                <div id="heading">
                    <h2>All articles for {heading}</h2>
                </div>
            )
        } else if (size == 'h2' && filter == 'language') {
            return (
                <div id="heading">
                    <h2>All articles for {heading}</h2>
                </div>
            )
        } else if (size == 'h1' && filter == 'category') {
            return (
                <div id="heading">
                   <h1>{heading}</h1>
                </div>
            )
        } else if (size == 'h2' && filter == 'source') {
            return (
                <div id="heading"> 
                   <h2> {heading} </h2>
                   <h5> Overall Tone Profile </h5>
                </div>
            )
        } else if (size == 'h5') {
            return (
                <div id="heading">
                   <h5> {heading} </h5>
                </div>
            )
        }
    };
}

export default Heading;