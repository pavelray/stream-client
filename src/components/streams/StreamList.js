import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../redux/actions';

import {Link} from 'react-router-dom';

export class StreamList extends Component {
  componentDidMount(){
    this.props.fetchStreams();
  }

  renderActionButton(stream){
    if(this.props.userId === stream.userId){
      return(
        <div className="right floated content">
          <Link to={`streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      )
    }
  }

  renderCreateButton(){
    if(this.props.isSignedIn){
      return(
        <div style={{textAlign:"right"}}>
          <Link to="/streams/new" className=" ui button">
            Create New Steam
          </Link>
        </div>
      )
    }
  }

  renderList(){
    return this.props.streams.map(stream=>{
      return(
        <div className="item" key={stream.id}>
          {this.renderActionButton(stream)}
          <i className="large middle aligned icon camera"></i>
          <div className="content">
            {stream.title}
          <div className="description">{stream.description}</div>
          </div>
        </div>

      )
    })
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
            {this.renderList()} 
        </div>
        {this.renderCreateButton()}
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    streams: Object.values(state.streams), // Object.values convert an object to array
    userId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  } 
}

export default connect(mapStateToProps,{fetchStreams})(StreamList)
