import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WeatherSection from '../sections/WeatherSection';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    cardContainer:{
        display:'flex',
        margin:'0 auto',
        width:'100%'
    }
  }));
const WeatherComponent=(props)=>{
  
    const classes=useStyles();
    return(
        <div className={classes.root}>
            <div className={classes.cardContainer}>
                <WeatherSection locationDetails={props.location}/>
            </div>
        </div>
    )
}
export default WeatherComponent