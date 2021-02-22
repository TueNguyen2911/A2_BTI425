import React, { Component } from 'react';
import Result from './Result';
import Pagination from './Pagination';
import DisplayResult from './DisplayResult'
export default class Visited extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {
        console.log('vis', this.props.viewedCity);
    }
    render() {
        if(this.props.viewedCity.length == 0)
        return(
            <div>
                <h1>Visited Cities</h1>
                <p>You haven't visted no cities</p>
            </div>
        )
        else 
        return(
            <div>
                <h1>Visited Cities</h1>
                <ul className="list-group mb-4" style={{listStyle:"none"}}>
                {this.props.viewedCity.map(data => (
                    <a style={{textDecoration: "none", color: "black"}} className={"detailed-card"} key={data.id} href="#" >
                    <DisplayResult data={data} showDetails={true} />
                </a>
                ))}
                </ul>
            </div>
        )
    }
}
