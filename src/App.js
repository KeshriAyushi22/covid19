import React, { Component } from 'react'
import {Cards,Chart,CountryPicker} from './components';
import styles from './App.module.css'
import {fetchData} from './api'
import coronaImage from './img/corona.png'
export default class App extends Component {
  
    state={
        resData:{},
        countrySelected:''
    }


async componentDidMount(){
    const data =await fetchData();
    this.setState({
       resData:data
    })
}

handleCountryChange = async (country)=>{
    console.log(country)
    //if country selected get its specific data n load its graph- using the same fetch Data api
    const data =await fetchData(country);
    this.setState({
        resData:data,
        countrySelected:country
     })
     
}

    render() {
        const {resData,countrySelected} =this.state;
        return (
            <div className={styles.container}>
              <img className={styles.image} src={coronaImage} alt="COVID-19"/>
               <Cards data={resData}/>
               <CountryPicker handleCountryChange={this.handleCountryChange}/>
               <Chart data={resData} countrySelected={countrySelected} />
            </div>
        )
    }
}
