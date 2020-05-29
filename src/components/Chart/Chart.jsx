import React, { useState, useEffect } from 'react';
import { fetchDailyData } from "../../api";
import {Line,Bar} from "react-chartjs-2";
import styles from "./Chart.module.css"


const Chart = () => {
    const [dailyData, setDailyData] = useState({});
    /** we cant use async with use effect as it takes pure
     * function as a parameter.
     * so to call api inside it we can use 
     * async function and then awaits for its resp and set it 
     * 
     */
    useEffect(() => {  //use effect cant be async as it takes pure function, so inside it we made an async fnctn
//will continue hitting the api -wont stop
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    })

    const lineChart=(
        dailyData.length
        ? (<Line 
         data={{
             labels:dailyData.map(({date})=>date),
             datasets:[{
                 data:dailyData.map(({confirmed})=>confirmed),
                 label:'Infected',
                 borderColor:'#3333ff',
                 fill:true,
             },{
                data:dailyData.map(({confirmed})=>confirmed),
                label:'Deaths',
                borderColor:'#3333ff',
                backgroundColor:'red',
                fill:true,
             }]
         }}/>)
         :null
        );
    
        return (
      <div className={styles.container}>
          {lineChart}
      </div>
    )
}

export default Chart;