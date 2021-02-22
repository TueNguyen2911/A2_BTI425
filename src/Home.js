import React from 'react';
import Result from './Result'
import Pagination from './Pagination'
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationData: props.locationData,
            time: props.time,
            searchData: props.searchData,
            records: null,
            loading: null,
            currentPage: 1, 
            rowsPerPage: 3,
            trimmedData: "",
        }
        this.getCurrentPageData = this.getCurrentPageData.bind(this);
        this.paginate = this.paginate.bind(this);
    }
    componentDidMount() {
        if(this.props.searchData && this.state.trimmedData == "") {
            this.getCurrentPageData();
        }
    }

    getCurrentPageData() {
        if(this.props.searchData)
        {
        const lastIndex = this.state.currentPage * this.state.rowsPerPage;
        const firstIndex = lastIndex - this.state.rowsPerPage;
        const trimmedData = this.state.searchData.list.slice(firstIndex, lastIndex);
        this.setState({trimmedData: trimmedData});
        }
        //console.log(this.state.trimmedData);
    }
    paginate(pageNumber) {
        this.setState({currentPage: pageNumber}, () => this.getCurrentPageData());
    }
    render() {
        if(this.state.searchData != null && this.state.searchData.cnt) {
            return(
                <div className='container mt-5'>
                    {this.state.trimmedData != "" && this.state.trimmedData.length > 3 ? (
                        <div>
                            <Result searchData={this.state.trimmedData} updateVisited={this.props.updateVisited}/>
                            <Pagination rowsPerPage={this.state.rowsPerPage} totalData={this.state.searchData.cnt} paginate={this.paginate} currentPage={this.state.currentPage}/>
                        </div>
                        ) : (<div><Result searchData={this.state.trimmedData} updateVisited={this.props.updateVisited}/></div>) } 
                </div>
            )

        }
        else if(this.state.searchData == null && this.state.locationData) {
            return(
                <div>
                <h2>{this.state.locationData.name}, {this.state.locationData.sys.country}</h2>
                <h3>{this.state.time}</h3>
                <h1>{this.state.locationData.main.temp}° C</h1>
                <p>{this.state.locationData.weather[0].description}</p>
                <p>min: {this.state.locationData.main.temp_min}° C / max: {this.state.locationData.main.temp_max}° C</p>
                </div>
            );
        }
        else {
        return(
            <h1>Home</h1>
        )
        }
    }
}