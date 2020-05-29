import React ,{useState,useEffect} from 'react';
import {NativeSelect,FormControl} from "@material-ui/core"
import styles from './CountryPicker.module.css'
import {getCountries} from "../../api"
const CountryPicker =({handleCountryChange})=>{

    const [fetchedCountries,setCountries] =useState([]);
 useEffect(()=>{
     const fetchAPI =async ()=>{
    
        setCountries(await getCountries())
     }
     fetchAPI();
 },[setCountries])   //if value in this array changes only then useEffect will run

    return (
       <FormControl className={styles.FormControl}>
           <NativeSelect defaultValue='' onChange={(e)=>{handleCountryChange(e.target.value)}}>
               <option value="">Global</option>
            { fetchedCountries.map((country,index)=>
                 <option value={country} key={index}>{country}</option>)
            }
           </NativeSelect>
       </FormControl>
    )
}

export default CountryPicker;