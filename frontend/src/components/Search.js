import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayResults from "./DisplayResults"
import Form from 'react-bootstrap/Form';
class Search extends Component {
  constructor(props){
      super(props);
      this.state = {
        responseObj:[],
        message:"",
        error: false,
        mediaType:"all",
        limit:10,    // Set default limit to 10
        searchString:"",

      }
      this.onSubmit = this.onSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        if (target.id==="limit"){
        this.setState({
          limit: event.target.value
        });
      } else {
        this.setState({
          mediaType: event.target.value
        });

      }
            console.log("mediaType = "+this.state.mediaType)
            console.log("limit = "+this.state.limit)

      }

onSubmit(e) {
     e.preventDefault();

       const mediaType = this.state.mediaType
       const searchString = this.state.searchString
       const limit = this.state.limit
       console.log("limit = "+limit)

     console.log("mediaType = "+mediaType)
     console.log("search = "+searchString)
      fetch(`/search/${searchString}/${mediaType}/${limit}`)
      .then(res => res.json())
      .then( result => {
              this.setState({responseObj:result});
              this.setState({ message: "Results Retrieved Successfully" });
              this.setState({error:false});
              console.log("Result == " + JSON.stringify(result));
          },
          (error) => {
              console.log("**** "+error);
               this.setState({message: error});
               this.setState({error:true});
          }
      )
   }


render() {
  const { error, message } = this.state;
  if (error) {
      return <div>Error: {error.message}</div>;
  } else
   return (
       <div>
               <Form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Search Term"
                        maxLength="50"
                        value={this.state.searchString}
                        onChange={(e) => this.setState({searchString:e.target.value})}
                        />

                        <button type="submit" className="btn btn-primary" >Go</button>
                        <div className="kind"><span>Media Type</span><br/>
                            <Form.Check inline label="All"
                                type="radio"
                                value="all"
                                checked={this.state.mediaType === "all"}
                                onChange={this.handleInputChange}
                                />
                            <Form.Check inline label="Music-Video"
                                type="radio"
                                value="musicVideo"
                                checked={this.state.mediaType === "musicVideo"}
                                onChange={this.handleInputChange}
                                />
                                <Form.Check inline label="Audio Book"
                                type="radio"
                                value="audiobook"
                                checked={this.state.mediaType === "audiobook"}
                                onChange={this.handleInputChange}
                                />
                                <Form.Check inline label="Movie"
                                type="radio"
                                value="movie"
                                checked={this.state.mediaType === "movie"}
                                onChange={this.handleInputChange}
                                />
                                <Form.Check inline label="Podcast"
                                type="radio"
                                value="podcast"
                                checked={this.state.mediaType === "podcast"}
                                onChange={this.handleInputChange}
                                />
                                <Form.Check inline label="TV Show"
                                type="radio"
                                value="tvShow"
                                checked={this.state.mediaType === "tvShow"}
                                onChange={this.handleInputChange}
                                />
                                <Form.Check inline label="Software"
                                type="radio"
                                value="software"
                                checked={this.state.mediaType === "software"}
                                onChange={this.handleInputChange}
                                />
                                <Form.Check inline label="eBook"
                                type="radio"
                                value="ebook"
                                checked={this.state.mediaType === "ebook"}
                                onChange={this.handleInputChange}
                                />
                                <label>Limit</label>
                                <input
                                    type="text"
                                    placeholder="Limit"
                                    maxLength="5"
                                    id="limit"
                                    value={this.state.limit}
                                    onChange={(e) => this.setState({limit:e.target.value})}
                                    />
                        </div>
                </Form>
                <div>
               { /* Pass the results from iTunes to displayResults, which displays it */}
               {this.state.responseObj.results?
                <DisplayResults  responseObj={this.state.responseObj.results} />: null
                 }
          </div>
   </div>
   )
}
}
export default Search;
