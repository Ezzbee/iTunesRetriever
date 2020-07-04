import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import imgLike from '../heart-like.png';
import imgUnlike from '../heart-unlike.png';

import '../App.css';

let fav=0
let resultsCopy=[]
class DisplayResults extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '',
                    error: false,
                    favoriteCount: 0,
                    results:[]}
                    this.onClickHeart = this.onClickHeart.bind(this);
    }
componentDidMount() {
    // map through the responseObj in order to add the favorite property
    // to the data returned from the API call by the server
         var   resultObj = this.props.responseObj.map((obj) => (
              {...obj,"favorite":false}
            ))
    // Then, update the state with the extended data
         this.setState({ results: resultObj });
       }
onClickHeart(e){
      // Make a copy of the results object
      resultsCopy = JSON.parse(JSON.stringify(this.state.results))
         //Toggle the property/state for favorite
         resultsCopy[e.target.id].favorite =  !resultsCopy[e.target.id].favorite
         this.setState({
            results:resultsCopy
          })
      // Update the count of favorites accordingly
      if (this.state.results[e.target.id].favorite) {
           fav = fav-1
      } else
      {
         fav = fav+1
      }
      this.setState({
         favoriteCount:fav
       })
 }

    render() {
        const { error, message } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else
        {
        if (typeof this.props.responseObj !== 'undefined') {

        const resultslist = this.state.results.map((result, index) =>
        <Col className="col-sm-4" key={index} >
       <Card style={{ width: '20rem' }} >
       <Card.Img variant="top" src={result.artworkUrl100.replace('100x100', '1200x1200')} />
       <Card.Body>
           <Card.Title style={{fontWeight:"bold", fontSize:30 }}>{result.trackId || result.artistId}</Card.Title>
           <Card.Title style={{fontWeight:"bold", fontSize:15 }}>{result.kind} </Card.Title>
           <Card.Text  >{result.trackName || result.collectionName}</Card.Text>
           <Card.Text>{result.longDescription || result.description || 'No description.'}</Card.Text>
           <Card.Text>
               <a target="_blank" rel="noopener noreferrer" href={result.trackViewUrl || result.collectionViewUrl} className="App-link">more...</a>
           </Card.Text>
          <Card.Img variant="top" id={index} src={this.state.results[index].favorite? imgLike:imgUnlike} style={{ width: '25%' }} onClick={this.onClickHeart} />
       </Card.Body>
       </Card>
       </Col>

        );
            return (
              <Container >
                <Row>
                  {resultslist}
              </Row>
              <h2>Favorites Count = {this.state.favoriteCount}</h2>
              </Container>
            );} else {return  null}

      }
     }
   }

export default DisplayResults;
