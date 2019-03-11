import React from "react";
import './detailInfo.css';

class DetailInfo extends React.Component{

  ref_info = React.createRef();

  isActive = () => {
    let elm = this.ref_info.current;
    if (elm.classList.contains('active_info')) {
      elm.classList.remove('active_info');
      void elm.offsetWidth;
    }
    elm.classList.add('active_info');
  };

  componentDidUpdate() {
    this.isActive();
  }

  componentDidMount() {
    this.isActive();
  }

  render() {

    return (
      <div ref={this.ref_info} id='detailed'>
        <h4 style={{color: 'white', textAlign: 'center', margin: '10px'}}>{this.props.restaurant.name}</h4>
        <hr/>
        <p style={{color: 'white', textAlign: 'center', letterSpacing: '2.5px', margin: '20px'}}>자세한 정보는 <a href={this.props.restaurant.place_url}>Daum</a>에<br/> 맡기고 내 턴을 종료한다!! </p>

      </div>
    )
  }
}

export default DetailInfo;
