import React, { useEffect, useRef } from "react";
import './list.css'
import isActive from "../../helper/toggleClass";

// const ListItem_ = (props) => {
//   const listItemContainer = useRef(null);
//   const { restaurant } = props;
//   useEffect(isActive(reviewsContainerRef, 'active_list'), [restaurant]);
//
//   return (
//     <li>
//       <div ref={listItemContainer} id={'listItem_'+this.props.idx} className={"card horizontal con " + this.rankCssEffect()} onClick={() =>{this.props.setSelectedId(this.props.idx)}} style={{margin: 0, height: 100, cursor: 'pointer'}}>
//         <div className="card-image" style={{width: '30%'}}>
//           <img style={{width:'100%',height:'100%', backgroundColor: 'white'}} src={this.rankImage()}/>
//         </div>
//         <div className="card-stacked">
//           <div className="card-content">
//             <h6 style={{textAlign: 'center', marginTop: 0, fontWeight: 'bold'}}>{this.props.restaurant.name}</h6>
//             <div style={{textAlign: 'center'}}><span style={{marginRight: '10px'}}>평점 : {this.props.restaurant.ratingsAverage}</span><span >리뷰 : {this.props.restaurant.reviewCount}</span></div>
//           </div>
//         </div>
//       </div>
//     </li>
//   );
// };

class ListItem extends React.Component {

  listItem = React.createRef();

  isActive = function () {
    this.listItem.current.classList.remove('active_list');
    if (this.props.selectedId === this.props.idx) {
      this.listItem.current.classList.add('active_list');
    }
  };

  rankCssEffect() {
    if (this.props.idx === 0) {
      return 'first';
    } else if (this.props.idx === 1) {
      return 'second';
    } else if (this.props.idx === this.props.lastIdx) {
      return 'hell';
    }
    return 'defaultBack';

  }

  componentDidUpdate() {
    this.isActive();
  }

  rankImage() {
    if (this.props.idx === 0) {
      return '/img/first.jpeg';
    } if (this.props.idx === 1) {
      return '/img/second.png';
    } else if (this.props.idx === this.props.lastIdx) {
      return '/img/hell.png';
    } else {
      return '/img/defaultRank.jpg';
    }
  }

  render() {
    return (
      <li>
        <div ref={this.listItem} id={'listItem_'+this.props.idx} className={"card horizontal con " + this.rankCssEffect()} onClick={() =>{this.props.setSelectedId(this.props.idx)}} style={{margin: 0, height: 100, cursor: 'pointer'}}>
          <div className="card-image" style={{width: '30%'}}>
            <img style={{width:'100%',height:'100%', backgroundColor: 'white'}} src={this.rankImage()}/>
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h6 style={{textAlign: 'center', marginTop: 0, fontWeight: 'bold'}}>{this.props.restaurant.name}</h6>
              <div style={{textAlign: 'center'}}><span style={{marginRight: '10px'}}>평점 : {this.props.restaurant.ratingsAverage}</span><span >리뷰 : {this.props.restaurant.reviewCount}</span></div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default ListItem;