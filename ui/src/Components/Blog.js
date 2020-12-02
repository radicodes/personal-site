import React, { Component } from 'react';

const MEDIUM_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@MorganRadic"

class Blog extends Component {
  render() {

    fetch(MEDIUM_URL)
      .then(res => res.json())
      .then(data => {
        const content = data.items;
        const posts = content.filter(item => item.categories.length > 0);
      })

    if(this.props.data){
      var blogs = this.props.data.blogs.map(function(blogs){
        var blogImage = 'images/blog/'+blogs.image;
        return <div key={blogs.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={blogs.url} title={blogs.title}>
               <img alt={blogs.title} src={blogImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{blogs.title}</h5>
                     <p>{blogs.category}</p>
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
                {blogs}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Blog;
