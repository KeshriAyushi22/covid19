import axios from 'axios';

const url ="https://covid19.mathdro.id/api";

export const fetchData = async () =>{
try{
    //deconstructed the resData and return only required info
    const {data :{confirmed,recovered,deaths,lastUpdate}}= await axios.get(url);
    return ({confirmed,recovered,deaths,lastUpdate})
}catch(error){
    console.log(error);
}
}

export const fetchDailyData= async()=>{
    try{
        const {data}= await axios.get(`${url}/daily`);
         const modifiedData= data.map((dailyData)=>({
             //returning object
             confirmed:dailyData.confirmed.total,
             deaths:dailyData.deaths.toatl,
             date:dailyData.reportDate
         }));

         return modifiedData
    }
    catch(error){
        console.log(error);
    }
}

export const countries= async()=>{
    try{
        const res= await axios.get(`${url}/countries`)
    }
    catch(error){
        console.log(error);
    }
}