import React, { Component } from 'react'

export class NewsItemComponent extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
    <>
      <div>
       <div className="card my-2">
       <div style={{display : 'flex', justifyContent : 'flex-end', position : 'absolute', right: '0'}}>
        <span className="badge rounded-pill bg-danger">{source}</span>
       </div>
         <img src={!imageUrl?"https://cdn.mos.cms.futurecdn.net/AroqSNSGZkfhWqRDKMkjPQ-1200-80.jpeg" : imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
               <h5 className="card-title">{title}</h5> 
               <p className="card-text">{description}</p>
               <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
               <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
      </>
    )
  }
}

export default NewsItemComponent
