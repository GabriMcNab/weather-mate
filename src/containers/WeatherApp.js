import React, {Component} from 'react';

import Layout from '../components/Layout/Layout';
import WeatherCurrent from '../components/Weather/Current';
import WeatherForecast from '../components/Weather/Forecast/Forecast';

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city:'Milano',
      country:'IT',
      fullForecast: [],     //5-days forecast, weather detail every 3 hours
      fiveDaysForecast: [],  //5-days forecast, day average
      selectedDay: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showHourlyDetailHandler = this.showHourlyDetailHandler.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.fetchData(this.state.city, this.state.country)
  }

  showHourlyDetailHandler(id) {
    this.setState({selectedDay: id})
  }

  componentDidMount() {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&units=metric&APPID=0e89f04938f66f1edd11f0e37d43aff2`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const fullForecast = this.getFullForecast(data);
        const fiveDaysForecast = this.getAverageWeather(fullForecast);
        this.setState({
          fullForecast,
          fiveDaysForecast
        })
      });
  }

  getFullForecast(data) {
    //get data array
    const dataArr = data.list;
    const fiveDaysArr = [];
    let today = new Date(Date.now()).getDay();

    //separate data array between days
    for(let i = 0; i < 5; i++){
      if(today > 6){today = today - 7}
      let dayArr = dataArr.reduce(function(acc, next, i){
        let day = new Date(next.dt_txt).getDay();
        if(day === today) {
          acc.push(next);
        }
        return acc;
      },[]);
      fiveDaysArr.push(dayArr);
      today ++;
    }

    //parse data array to include only desired data
    const finalArr = fiveDaysArr.map(function(arr){
      return arr.map((obj) => ({
        //(add 3 zero to original date in millisecond from API to match correct date)
        date: obj.dt*10**3,
        desc: obj.weather[0].description,
        id: obj.weather[0].id,
        minTemp: obj.main.temp_min,
        maxTemp: obj.main.temp_max,
        humidity: obj.main.humidity,
        windDirection: obj.wind.deg,
        windSpeed: obj.wind.speed
      }));
    });

    //return array
    return finalArr;
  }

  getAverageWeather(arr) {
    return arr.map(a => {
      //Reduce every "day array" to object with average/min/max values
      const allValuesObj = a.reduce((acc, next) => {
        for (let prop in next) {                    //Store all the values in arrays for each object property
          acc[prop] = [...acc[prop], next[prop]]
        }     
        return acc;
      });
      let avgObj = {};
      if (!Array.isArray(allValuesObj.date)){       //if there's no array (after 20pm there's gonna be only one forecast for the day)
        avgObj = {...allValuesObj};                 
      } else {                                      //otherwise get desired value from arrays
        avgObj = {
          "date": allValuesObj.date[0],
          "desc": this.findMostFrequent(allValuesObj.desc),
          "id": this.findMostFrequent(allValuesObj.id),
          "minTemp": Math.round(Math.min(...allValuesObj.minTemp) * 10) / 10,   //get min temp with one decimal
          "maxTemp": Math.round(Math.max(...allValuesObj.maxTemp) * 10) / 10,   //get max temp with one decimal
        }
      }
      return avgObj;
    });
  }

  findMostFrequent(arr) {
    let counts = {};
    let compare = 0;
    let mostFrequent;
    arr.forEach(function(obj){
      if(!counts[obj]){counts[obj] = 1}
      else {counts[obj] = counts[obj] + 1}
      if(counts[obj] > compare){
        compare = counts[obj];
        mostFrequent = obj;
      }
    });
    return mostFrequent;
  }

  render() {
    console.log(this.state.fullForecast);
    console.log(this.state.fiveDaysForecast);
    return (
      <Layout>
        {/* <WeatherCurrent /> */}
        <WeatherForecast 
          fullForecast={this.state.fullForecast}
          fiveDaysForecast={this.state.fiveDaysForecast}
          clicked={this.showHourlyDetailHandler}/>
      </Layout>
    )
  }
}

export default WeatherApp;