import React, { Component } from 'react';

const MEDIUM_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@MorganRadic";

class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mediumArticles: []
    }
  }

  componentDidMount(){
    this.getMediumArticles();
  }

  getMediumArticles(){

    fetch(MEDIUM_URL)
    .then(res => res.json())
    .then(data => {
      const posts = data.items;
      this.setState({mediumArticles: posts});
    });
  }

  render() {
    if(this.state.mediumArticles){
      var posts = this.state.mediumArticles.map(function(post){
        var thumbnail = post.thumbnail;
        var title = post.title;
        var link = post.link;
        return <div key={title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={link} title={title} target="_blank" rel="noopener noreferrer">
               <img alt={title} src={thumbnail} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{title}</h5>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
        </div>
      })
    }

    return (
      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>Check Out Some of My Recent Pieces.</h1>

            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {posts}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Blog;
