import React, { Component } from 'react';

class DisplayResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onHover = this.onHover.bind(this);
    }
    onHover(e) {
        console.log(e);
    }
    render() {
        return(
            <div>
                {!this.props.showDetails ? (
                    <li>
                    <div className="container card-body m-2 p-3" style={{backgroundColor: "#DFDFDE"}} onMouseEnter={(e) => this.onHover(e)}>
                        <div className="row">
                            <div className="col-1">
                            <img src={this.props.data.icon} />
                            </div>
                            <div className="col-8">
                                <img src={this.props.data.flag} width="25" /> {this.props.data.name} {this.props.data.country} <br/>
                                Feels like {this.props.data.feels_like}° C, {this.props.data.description}. <br />
                                <b>{this.props.data.temp} ° C</b>
                            </div>
                        </div>
                        <span style={{display: 'none'}}> Click to see more details </span>
                    </div>
                    </li>
                ) : (
                    <li>
                    <div className="container card-body m-2 p-3" style={{backgroundColor: "#DFDFDE"}}>
                        <div className="row">
                            <div className="col-1">
                            <img src={this.props.data.icon} />
                            </div>
                            <div className="col-8">
                                <img src={this.props.data.flag} width="25" /> {this.props.data.name} {this.props.data.country} <br/>
                                Feels like aaa {this.props.data.feels_like}° C, {this.props.data.description}. <br />
                                <b>{this.props.data.temp} ° C</b>
                                <br /> <br/>
                                Min: {this.props.data.temp_min}° C, Max: {this.props.data.temp_max}° C <br/>
                                Wind: {this.props.data.wind} m/s, humidity: {this.props.data.humidity}, Pressure: {this.props.data.pressure} hPa
                                Sunrise: {this.props.data.sunrise}, sunset: {this.props.data.sunset} <br />
                                Geo coords: [{this.props.data.lon}, {this.props.data.lat}]
                            </div>
                        </div>
                    </div>
                    </li>
                )}
            </div>
            
        )
    }
}
export default DisplayResult;