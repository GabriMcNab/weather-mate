import React, { Component } from 'react';

import Layout from '../components/Layout/Layout';
import WeatherCurrent from '../components/Weather/Current/Current';
import WeatherForecast from '../components/Weather/Forecast/Forecast';
import Footer from '../components/Footer/Footer';

import classes from './WeatherApp.css';

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      country: '',
      fullForecast: null,     //5-days forecast, weather detail every 3 hours
      fiveDaysForecast: null,  //5-days forecast, day average
      selectedDay: 0,
      isLoading: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showHourlyDetailHandler = this.showHourlyDetailHandler.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.fetchData(this.state.city, this.state.country)
  }

  showHourlyDetailHandler(e, id) {
    this.setState({ selectedDay: id })
  }

  async componentDidMount() {
    await fetch('https://ipinfo.io/geo')
      .then(res => res.json())
      .then(data => {
        this.setState({
          city: data.city,
          country: data.country
        })
      })
      .catch(err => console.log(err));
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&units=metric&APPID=0e89f04938f66f1edd11f0e37d43aff2`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const fullForecast = this.getFullForecast(data);
        const fiveDaysForecast = this.getAverageWeather(this.getFullForecast(data));
        this.setState({
          fullForecast,
          fiveDaysForecast,
          isLoading: false
        })
      })
      .catch(err => console.log(err));
  }

  getFullForecast = (data) => {
    //get data array
    const dataArr = data.list;
    const fiveDaysArr = [];
    let today = new Date(Date.now()).getDay();

    //separate data array between days
    for (let i = 0; i < 5; i++) {
      if (today > 6) { today = today - 7 }
      let dayArr = dataArr.reduce((acc, next) => {
        let day = new Date(next.dt_txt).getDay();
        if (day === today) {
          acc.push(next);
        }
        return acc;
      }, []);
      fiveDaysArr.push(dayArr);
      today++;
    }

    //parse data array to include only desired data
    const finalArr = fiveDaysArr.map(function (arr) {
      return arr.map((obj) => {
        const date = obj.dt * 10 ** 3;  //(add 3 zero to original date in millisecond from API to match correct date)
        const id = obj.weather[0].id;
        let weatherGroup;


        if (id === 800) { weatherGroup = "800" }      //if id = 800 it's sunny
        else { weatherGroup = String(id).split('')[0] }    //otherwise get first digit of id to identify weather group
        const weatherTypes = {
          800: "clear",
          2: "thunder",
          3: "sprinkle",
          5: "rain",
          6: "snow",
          7: "fog",
          8: "cloud"
        }


        return ({
          date,
          desc: obj.weather[0].description,
          id: weatherTypes[weatherGroup],
          minTemp: obj.main.temp_min,
          maxTemp: obj.main.temp_max,
          humidity: obj.main.humidity,
          windDirection: obj.wind.deg,
          windSpeed: obj.wind.speed
        })
      });
    });

    //return array
    return finalArr;
  }

  getAverageWeather(arr) {
    return arr.map(a => {
      //Reduce every "day array" to object with average/min/max values
      const allValuesObj = a.reduce((acc, next, index) => {
        for (let prop in next) {                    //Store all the values in arrays for each object property
          if (index < 2) {
            acc[prop] = [next[prop]];
          } else {
            acc[prop] = [...acc[prop], next[prop]];
          }
        }
        return acc;
      }, {});
      let avgObj = {};
      if (!Array.isArray(allValuesObj.date)) {       //if there's no array (after 20pm there's gonna be only one forecast for the day)
        avgObj = { ...allValuesObj };
      } else {                                      //otherwise get desired value from arrays
        avgObj = {
          "date": allValuesObj.date[0],
          "id": this.findMostFrequent(allValuesObj.id),
          "minTemp": Math.round(Math.min(...allValuesObj.minTemp)),   //get min temp with one decimal
          "maxTemp": Math.round(Math.max(...allValuesObj.maxTemp)),   //get max temp with one decimal
        }
      }
      return avgObj;
    });
  }

  findMostFrequent(arr) {
    let counts = {};
    let compare = 0;
    let mostFrequent;
    arr.forEach(function (obj) {
      if (!counts[obj]) { counts[obj] = 1 }
      else { counts[obj] = counts[obj] + 1 }
      if (counts[obj] > compare) {
        compare = counts[obj];
        mostFrequent = obj;
      }
    });
    return mostFrequent;
  }

  render() {
    return (
      <div>
        {this.state.isLoading &&
          <div style={{
            color: "#333",
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <h1>Loading.. please wait</h1>
          </div>}
        {!this.state.isLoading &&
          <React.Fragment>
            <Layout>
              <h1 className={classes.Title}>Weather Mate</h1>
              <div className={classes.WeatherMainContainer}>
                <div className={classes.WeatherCurrentContainer}>
                  <WeatherCurrent
                    fullForecast={this.state.fullForecast}
                    city={this.state.city}
                    country={this.state.country}
                  />
                </div>
                <div className={classes.WeatherForecastContainer}>
                  <WeatherForecast
                    fullForecast={this.state.fullForecast}
                    fiveDaysForecast={this.state.fiveDaysForecast}
                    clicked={this.showHourlyDetailHandler}
                    selectedDay={this.state.selectedDay} />
                </div>
              </div>
            </Layout>
            <Footer />
          </React.Fragment>}
      </div>
    )
  }
}

export default WeatherApp;