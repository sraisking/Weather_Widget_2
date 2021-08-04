import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { getDay } from '../Utils'
const useStyles = makeStyles({
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    textContainer: {
        display: 'flex'
    }
});
const DayWiseForeCast = ({ weatherForecast }) => {
    const classes = useStyles();
    return (
        <div style={{ padding: '8px' }}>
            <div className={classes.content}>
                <div>
                    <Typography>
                        {getDay(weatherForecast.dt)}
                    </Typography>
                </div>
                <div>
                    <img src={`http://openweathermap.org/img/wn/${weatherForecast.weather[0].icon}@2x.png`} alt="ICON" />
                </div>
                <div>
                    <div className={classes.textContainer}>
                        <div>
                            <Typography variant="subtitle1">
                                {weatherForecast.temp.min}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6">
                                {weatherForecast.temp.max}
                            </Typography>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
export default DayWiseForeCast