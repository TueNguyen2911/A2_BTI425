import React from 'react';
//import { Switch, Route } from 'react-router-dom';
import Home from './Home.js';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Grid, Row, Col, Dropdown, DropdownButton, Button, Badge } from 'react-bootstrap';
import {  Link, Switch, Redirect, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import data from './city_list.json';
import NavigateBar from './NavigateBar.js';
import Result from './Result';
import Visited from './Visited';
import { withRouter } from 'react-router-dom';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null, 
            long: null,
            dateTime: null,
            locationData: null,
            visitedCity: [],
            searchId: "",
            singleCity: true,
            searchData: null,
            searched: true
        }
        this.getLocation = this.getLocation.bind(this);
        this.getLocationInfo = this.getLocationInfo.bind(this);
        this.updateSearchId = this.updateSearchId.bind(this);
        this.search = this.search.bind(this);
        this.updateSearched = this.updateSearched.bind(this);
        this.updateVisited = this.updateVisited.bind(this);
    }
    updateVisited(newData) {
        let temp_vistitedCity = this.state.visitedCity.concat(newData);
        this.setState({visitedCity: temp_vistitedCity}, () => console.log("new", this.state.visitedCity));
    }
    updateSearched() {
        this.setState({searchData: null});
    }

    updateSearchId(e) {
        this.setState({
            searchId: e.target.value
        })
    }
    componentDidMount() {
        this.getLocation();
    }
    getLocationInfo() {
        const api_url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + 
        "&lon=" + this.state.long + "&appid=1c4993f81daae9d4eaf06858adea5d31&units=metric";
        console.log(api_url);
        fetch(api_url)
        .then(res => res.json()) //only res allowed, response causes SyntaxError: Unexpected token < in JSON at position 0 
        .then(data => {
            this.setState({locationData: data});
        })
        .catch((error) => console.log(error))
        
    }
    getLocation() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    dateTime: (Date(position.timestamp * 1000).toString()).slice(0,24)
                }, () => this.getLocationInfo())
            })
        }
        else {
            console.log("Can't get location");
        }
    }
    search = (e) => {
        e.preventDefault();
        let keyword = (e.target.elements.city_search.value).replace(/\s+/g,'').toLowerCase();
        let city = "";
        let country = "";
        let api_url = "";
        if(keyword.indexOf(',') != -1)
        {
            city = keyword.slice(0, keyword.indexOf(','));
            city = city.charAt(0).toUpperCase() + city.slice(1);
            country = keyword.slice(keyword.indexOf(',') + 1).toUpperCase();
            api_url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=1c4993f81daae9d4eaf06858adea5d31&units=metric`;
            this.setState({singleCity: true});
            console.log(api_url);
        }
        else 
        {
            let city_list_id = [];
            city = keyword.slice();

            api_url = 'http://api.openweathermap.org/data/2.5/group?id=';
            if(data) {
                console.log(data)
                for(let i = 0; i < data.length; i++) {
                    if(data[i].name.toLowerCase() == city.toLowerCase())
                        city_list_id.push(data[i].id);
                }
                console.log(city_list_id);
                city_list_id.forEach((elem, id) => {
                    api_url += elem;
                    if(id < city_list_id.length - 1)
                        api_url += ',';
                })
                api_url += '&appid=1c4993f81daae9d4eaf06858adea5d31&units=metric&cnt=50';
                this.setState({singleCity: false});
                console.log(api_url);
            }
        }
        fetch(api_url)
        .then(res => res.json())
        .then(data => { 
            if((data.cod != "401" && data.cod != "404" && data.cod != "429"))
                this.setState({searchData: data, searched: true});
            else if(document.getElementById('error')) {   
                document.getElementById('error').innerHTML = "Error finding city";
            }
        })
        .catch(error => {
            console.log(error);
        });

    }

    render() {
        return(
            <div>
                <div id="nav_bar">
                    <Navbar>
                        <Navbar.Brand as={Link} onClick={this.updateSearched} to="/">WeatherApp</Navbar.Brand>
                        <Navbar.Collapse>
                            <Nav className="mr-auto">
                                <NavItem eventkey={1} href="/">
                                    <Nav.Link as={Link} onClick={this.updateSearched} to="/">Home</Nav.Link>
                                </NavItem>
                                <NavItem eventkey={2} href="/visited">
                                    <Nav.Link as={Link} to="/visited">Visited Cities</Nav.Link>
                                </NavItem>
                            </Nav>
                        {window.location.pathname != "/visited" ? (
                            <Form inline onSubmit={this.search}>
                                <Badge id="error" style={{color: "red", type: "bounce"}}></Badge>
                                <FormControl id="city_search" type="text" placeholder="Search for a city" className="mr-sm-2" />
                                <Button type="submit" id="search_button" variant="outline-success">Search</Button>{' '}
                            </Form>
                        ) : (<Form></Form>)}
                        
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                    <Switch>
                        <Route exact path="/" component={() => <Home locationData={this.state.locationData} time={this.state.dateTime} searchData={this.state.searchData} updateVisited={this.updateVisited}  /> } />
                        <Route exact path="/visited" component={() => <Visited viewedCity={this.state.visitedCity} />} />
                    </Switch>

            </div>
        )
    }
}
export default App;

