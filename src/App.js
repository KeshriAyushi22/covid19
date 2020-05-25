import React, { Component } from 'react'
import {Cards,Chart,CountryPicker} from './components';
import styles from './App.module.css'
import {fetchData} from './api'
export default class App extends Component {
  
    state={
        resData:{}
    }


async componentDidMount(){
    const data =await fetchData();
    this.setState({
       resData:data
    })
}

    render() {
        const {resData} =this.state;
        return (
            <div className={styles.container}>
               <Cards data={resData}/>
               <CountryPicker/>
               <Chart/>
            </div>
        )
    }
}
