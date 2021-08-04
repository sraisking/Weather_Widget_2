import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import axios from 'axios';
import PresentDayWeather from './PresentDayWeather';
import DayWiseForeCast from './DayWiseForecast';
import { getDate, getDay, getMonth } from '../Utils';
import ErrorComponent from '../customComponents/ErrorComponent';
import CustomSwitch from '../customComponents/CustomSwitch';
import SearchComponent from '../customComponents/SearchComponent';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor:'#90caf9'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    weatherForecastContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    footerContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

const WeatherSection = ({ locationDetails }) => {
    const classes = useStyles();
    const [userInputLocation, setUserInputLocation] = useState(null)
    const [weatherForecast, setWeatherForecast] = useState({});
    const [isError, setError] = useState(false);
    const [imperial, setImperial] = useState(false);
    const [unit, setUnit] = useState("metric");

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result;
                let fetchedCitiesGeoLocation;
                if (userInputLocation === null) {
                    result = await axios.get(
                        `https://api.openweathermap.org/data/2.5/onecall?&units=${unit}&lat=${locationDetails.latitude}&lon=${locationDetails.longitude}&appid=11ab70ad14039b5b8971613e0c1c91b6`
                    );
                    setWeatherForecast(result.data);
                }
                else {
                    fetchedCitiesGeoLocation = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${userInputLocation}&limit=5&appid=11ab70ad14039b5b8971613e0c1c91b6`)
                    result = await axios.get(
                        `https://api.openweathermap.org/data/2.5/onecall?&units=${unit}&lat=${fetchedCitiesGeoLocation.data[0].lat}&lon=${fetchedCitiesGeoLocation.data[0].lon}&appid=11ab70ad14039b5b8971613e0c1c91b6`
                    );
                    setWeatherForecast(result.data);
                }
            }
            catch (err) {
                setError(true)
            }
        }
        fetchData();
    }, [unit, userInputLocation]);


    const getTitle = () => {
        return weatherForecast.timezone
    }
    const getSubheader = () => {
        const { dt } = weatherForecast.current || {}
        return `${getDay(dt)},${getDate(dt)}th ${getMonth(dt)}`
    }
    const handleUnitChange = () => {
        setImperial(!imperial);
        imperial ? setUnit("imperial") : setUnit("metric")
    }
    const onClick = (value) => {
        setUserInputLocation(value)
    }
    const getWeatherContent = () => (
        <>
            <CardHeader
                title={getTitle() || null}
                subheader={getSubheader() || null}
                action={
                    <SearchComponent id="searchbox" onClick={onClick} />
                }
            />
            <CardContent>
                <div className={classes.cardContent}>
                    <div>
                        <PresentDayWeather weatherForecast={weatherForecast.current} />
                    </div>
                    <div>
                        <div className={classes.weatherForecastContainer}>
                            {weatherForecast !== null && weatherForecast.daily !== undefined && weatherForecast.daily.map((day, index) => {

                                return (
                                    <div item key={`${index}${index * 2}`}>
                                        <DayWiseForeCast weatherForecast={day} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardActions className={classes.footerContainer}>
                <div className={classes.footerContainer}>
                    <div>

                        <Typography>
                            Farhenhit
                        </Typography>
                    </div>
                    <div>
                        <CustomSwitch checked={imperial} onChange={handleUnitChange} name="checkedC" />
                    </div>
                    <div>
                        <Typography>
                            Celsius
                        </Typography>
                    </div>
                </div>
            </CardActions>
        </>

    )

    return (
        <>
            <Card className={classes.root}>
                {!isError && getWeatherContent()}
                {isError && (<ErrorComponent />)}
            </Card>
        </>
    )
}

export default WeatherSection