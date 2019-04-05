import React, { Component } from 'react';

class List extends Component {

  render() {
    const style = {
      backgroundColor:'black',
      color :'white',
      padding: '1em 0 1em 2em',
      border: '0.2em solid white',
      borderRadius: '0.5em'
    }
    return (
      <div>
        <div style={style}>
          <ListItem
            place={this.props.place}
            onClick1 = {this.props.onClick}
          />
        </div>
      </div>
    );
  }
}


class ListItem extends Component {
  myonclick = () => {this.props.onClick1(this.props.place)}
  render() {
    return (
      <div onClick={this.myonclick}>
        <h5>{this.props.place.place_name}</h5>
        <li>{this.props.place.address_name}</li>

      </div>
    )
  }
}



export default List;