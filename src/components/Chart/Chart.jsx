import React, { useState, useEffect } from 'react';
import { fetchDailyData } from "../../api";
import {Line,Bar} from "react-chartjs-2";
import styles from "./Chart.module.css"


const Chart = ({data:{confirmed,deaths,recovered},countrySelected}) => {
    const [dailyData, setDailyData] = useState({});
    /** we cant use async with use effect as it takes pure
     * function as a parameter.
     * so to call api inside it we can use 
     * async function and then awaits for its resp and set it 
     * 
     */
    useEffect(() => { 
         //use effect cant be async as it takes pure function, so inside it we made an async fnctn
        //will continue hitting the api -wont stop
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    },[])

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
                data:dailyData.map(({deaths})=>deaths),
                label:'Deaths',
                borderColor:'#3333ff',
                backgroundColor:'rgb(255,0,0,0.5)',
                fill:true,
             }]
         }}/>)
         :null
        );

    const barChart =(
        confirmed
        ?(
        <Bar
            data={{
                labels:['Infected','Recovered','Deaths'],
                datasets:[{
                    label:'People',
                    backgroundColor:[
                        'rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)'
                    ],
                    data:[confirmed.value,recovered.value,deaths.value]
                }]
            }}
            options={{
                legend :{display:false},
                title:{display:true,text:`Current state in ${countrySelected}`}
            }}
        />
        ):null
    );


    
        return (
      <div className={styles.container}>
          {console.log(confirmed,deaths,recovered)}
       {countrySelected
        ? barChart
        : lineChart
        }
      </div>
    )
}


export default Chart;