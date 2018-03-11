import React, { Component } from 'react';
import WeatherList from './WeatherList'
import './weather-icons.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyWeather: [],
      city:'Varazze',
      country:'IT'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.fetchData(this.state.city, this.state.country)
  }

  componentDidMount(){
    this.fetchData(this.state.city, this.state.country)
  }

  fetchData(city, country){
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&APPID=0e89f04938f66f1edd11f0e37d43aff2`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const weather = this.parseData(data);
        this.setState({
          dailyWeather: weather,
        })
      });
  }

  parseData(data) {
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
      },[])
      fiveDaysArr.push(dayArr);
      today ++;
    }

    //reduce array to array of obj with desired data
    const finalArr = fiveDaysArr.map(function(val){
      return val.reduce(function(acc, next){
        //use date as key
        //(add 3 zero to original date in millisecond from API to match correct date)
        acc[next.dt*10**3] = {
          date: new Date(next.dt_txt),
          desc: next.weather[0].description,
          id: next.weather[0].id,
          minTemp: next.main.temp_min,
          maxTemp: next.main.temp_max
        }
        return acc;
      },{})
    })

    //return array
    return finalArr;
  }

  render() {
    return (
      <div className="app">
        <h1>5 Days Weather Forecast</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <h3>Choose city: </h3>
            <input
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
            ></input>
            <button
              type="submit"
            >Go!</button>
          </form>
        </div>
        <WeatherList data={this.state.dailyWeather}/>
      </div>
    );
  }
}

export default App;
