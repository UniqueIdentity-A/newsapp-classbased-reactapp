import React, { Component } from 'react'
import NewsItemComponent from './NewsItemComponent'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class news extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: "top-headlines",
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize : PropTypes.number,
    category: PropTypes.string,
  }

    capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


constructor(props){
  super (props);
  this.state = {
    articles : [],
    loading : true,
    page : 1,
    totalResults : 0,
  }
  document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Gun`;
}


async updateNews(){
  this.props.setProgress(10);
  let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url); // await it will return at the last
  this.props.setProgress(30);
  let parsedData = await data.json();
  this.props.setProgress(50);
  //console.log(parsedData);
  this.setState({articles : parsedData.articles, 
                 totalResults:parsedData.totalResults, 
                 loading : false
                 })
  this.props.setProgress(100);
}

async componentDidMount(){ //async return promise it is resolved
  this.updateNews();
}

// handlePreviousClick =async()=>{
//   this.setState({page : this.state.page -1})
//   this.updateNews();
// }


// handleNextClick =async()=>{
// this.setState({page : this.state.page +1})
// this.updateNews();
// }

fetchMoreData = async() => {
  this.setState({page : this.state.page +1})
  let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true})
  let data = await fetch(url); // await it will return at the last
  let parsedData = await data.json();
  //console.log(parsedData);
  this.setState({articles : this.state.articles.concat(parsedData.articles), 
                 totalResults:parsedData.totalResults, 
                 loading : false
                 })
};

  render() {
    return (
    <>
      
        <h1 className='mx-4' style={{'marginTop': '4.5rem','marginBottom': '0.5rem'}}>Top Headlines - {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner/>} 
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}>

        <div className="container my-3">
        <div className="row">
        {this.state.articles.map((element)=>{
            return    <div className="col-md-3" key={element.url} >
              <NewsItemComponent title = {element.title?element.title.slice(0,45):""} // slice short the title
                                 description ={element.description?element.description : "Click on see more to get details"} // slice short the description
                                  imageUrl ={element.urlToImage} newsUrl={element.url}
                                  author={element.author}
                                  date={element.publishedAt}
                                  source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div>
        <div className="d-flex justify-content-evenly my-4">
        <button disabled={this.state.page<=1} type="button" onClick ={this.handlePreviousClick} className="btn btn-dark" >&larr;</button>
        <button disabled={(this.state.page+1> Math.ceil(this.state.totalArticles/this.props.pageSize))}type="button" onClick={this.handleNextClick} className="btn btn-dark" >&rarr;</button>
        </div>
        </div> */}
     
    </>
    )
   }
  }
export default news
