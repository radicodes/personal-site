import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Testimonials from './Components/Testimonials';
import Blog from './Components/Blog';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {},
      mediumArticles: [{}]
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  getMediumArticles(){
    
    const MEDIUM_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@MorganRadic";

    fetch(MEDIUM_URL)
    .then(res => res.json())
    .then(data => {
      const posts = data.items;
      this.setState({mediumArticles: posts});
    });
  }

  componentDidMount(){
    this.getResumeData();
    this.getMediumArticles();
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main}/>
        <About data={this.state.resumeData.main}/>
        <Resume data={this.state.resumeData.resume}/>
        <Blog data={this.state.mediumArticles}/>
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default App;
