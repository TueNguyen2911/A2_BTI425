import React, { Component } from 'react';
import moment, { updateLocale } from 'moment';
import classNames from 'classnames';
import { Container } from 'react-bootstrap';
import DisplayResult from './DisplayResult';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: [],
            visitedCities: []
        }
        this.loadPageData = this.loadPageData.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);   
        this.onHover = this.onHover.bind(this);
    }
    onHover(e) {
        
    }
    componentDidMount() {
        this.loadPageData();
    }
    componentWillUnmount() {
        this.props.updateVisited(this.state.visitedCities);
    }
    componentDidUpdate(prevProps) {
        if(prevProps.searchData !== this.props.searchData)
            this.loadPageData();
    }
    loadPageData() {
        this.setState({
            record: []
        }, () => {
            let local_record = [];
            this.props.searchData.forEach(data => {
                let temp_record = {
                    id: data.id,
                    main: data.weather[0].main,
                    description: data.weather[0].description,
                    icon: "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
                    temp: data.main.temp,
                    feels_like: data.main.feels_like,
                    temp_min: data.main.temp_min,
                    temp_max: data.main.temp_max,
                    pressure: data.main.pressure, 
                    humidity: data.main.humidity, 
                    wind: data.wind.speed,
                    pressure: data.main.pressure,
                    country: data.sys.country, 
                    sunrise: moment.unix(data.sys.sunrise).format("hh::mm::ss A"),
                    sunset: moment.unix(data.sys.sunset).format("hh::mm::ss A"),
                    name: data.name,
                    flag: "http://openweathermap.org/images/flags/" + data.sys.country.toLowerCase() + ".png",
                    showDetails: false,
                    lon: data.coord.lon,
                    lat: data.coord.lat,
                    lastUpdated: new Date().toLocaleString("en-US")
                }
                local_record.push(temp_record);
            });
            //console.log(local_record);
            this.setState({record: local_record});
        })
        
    }
    toggleDetails = (e, data) => {
        e.preventDefault();
        this.setState({
            record: this.state.record.map(elem => {return data.id == elem.id ? {...elem, showDetails: !elem.showDetails} : elem})
        });
        const test_id = this.state.visitedCities.filter(elem => elem.id == data.id); //return 1 record if exist, 0 if none
        if(test_id.length == 0) {
            let temp_vistitedCities = this.state.visitedCities.concat(data);
            this.setState({
                visitedCities: temp_vistitedCities
            });
        }
    }
    
    render() {
        return(
            <div>
                <ul className="list-group mb-4" style={{listStyle:"none"}}>
                    {this.state.record.map(data => (
                        <a style={{textDecoration: "none", color: "black"}} className={classNames({'summary-card': !data.showDetails, 'detailed-card': data.showDetails})} key={data.id} href="#" onClick={(e) => this.toggleDetails(e, data)} onMouseEnter={(e) => this.onHover(e)}>
                            <DisplayResult data={data} showDetails={data.showDetails} />
                        </a>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Result;

    