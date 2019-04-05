import React, { Component } from 'react';
import { Button, Row, Input } from 'react-materialize';
import Rating from 'react-rating';
import axios from 'axios';
import List from './List.js'
import './nav.css'
import NavFilter from './navFilter';
import Modal from '../modal/Modal';

const Nav = (props) => {
  const filterArr = ['ALL', 'korean', 'japanese', 'chinese', 'western', 'etc'];
  const { setFilter } = props;
  return (
      <nav>
        <div className="nav-wrapper back-black">
          <a href="#" className="brand-logo center logo-font">Tasty Road</a>
          <ul className="left" id="filter-ul">
            {filterArr.map(filter => <NavFilter setFilter={setFilter} filter={filter}/>)}
          </ul>
          <div className="post-icon-container right">
            <i className="material-icons" id="nav-post-icon">create</i><a className="right" href="#" id="post-restaurant-btn">식당 등록</a>
          </div>
          <div id='nav_bottom_line'/>
        </div>
        <Modal/>
      </nav>
  );
};

class Nav_ extends Component {
  modalRef = React.createRef();
  modalInput = React.createRef();
  modalTextArea = React.createRef();
  state = {
    mapData : []
  };

  data = {
    daumPId: false,
    placeName: false,
    map: false,
    placeUrl: false,
    user: false,
    filter: false,
    review: false,
  };

  onClickHandler = (e) => {

    this.data.daumPId = e.id;
    this.data.placeName = e.place_name;
    this.data.map={latitude: e.y,longitude: e.x};
    this.data.placeUrl = e.place_url;
    this.data.user=this.props.user._id;

    var input = document.getElementById('input')
    input.value = e.place_name;

    this.setState({
      mapData : []
    })
  };

  onClickRadio = (e) => {
    this.data.filter = e.target.value;
  };

  onChange = (e) => {

    var places = new window.daum.maps.services.Places();
    var keyword = e.target.value;

    if (keyword === '') {
      this.setState({mapData: []});
    } else {
      places.keywordSearch(keyword, this.placeSearchDB, {
        location: new window.daum.maps.LatLng(37.545486, 127.051632),
        radius: 3000,
        size: 5,

      } );
    }
  };


  placeSearchDB = (data, status) => {
    if (status === window.daum.maps.services.Status.OK) {
      this.setState({
        mapData : data
      })
    }
  };


  handleChange = event => {
    this.data.review = event.target.value;
    console.log(this.data)
  };


  hanldeSubmit = () => {
    const radios = document.getElementsByName('group1');
    let selectedRadio;
    for (let i = 0, length = radios.length; i < length; i++)
    {
      if (radios[i].checked)
      {
        this.data.filter = radios[i].value;
        selectedRadio = radios[i];
        break;
      }
    }

    const data = this.data;

    let isEmpty = Object.values(data).every(function(item) {
      return !!item;
    });

    if (isEmpty) {
      this.modalInput.current.value = '';
      this.modalTextArea.current.value = '';
      selectedRadio.value = '';
      // console.log(this.modalRef);
      // this.modalRef.current.modal = 'close';
      axios.post('/api/registerRestaurant',{ data })
        .then(res => this.props.setFilter(""))
        .catch(err => console.log('Post Request err', err))
    } else {
      window.Materialize.toast('등록 실패! 양식에 맞춰서 다시 써 줘', 5000)
    }
  };
  modalStyle = {
    width:'35%',
    height: '70%',
    border: '0.2em solid black',
    fontFamily: 'Do Hyeon, sans-serif'
  };


  filterArr = ['', 'korean', 'japanese', 'chinese', 'western', 'etc'];

  render() {


    const buttonStyle = {
      margin : '0.5em',
      backgroundColor : 'black'
    };
    return (
      <nav>
        <div className="nav-wrapper" style={{backgroundColor: "black"}}>
          <a href="#" className="brand-logo center" style={{fontFamily: 'Leckerli One ,cursive'}}>Tasty Road</a>
          <ul id="nav-mobile" className="left hide-on-med-and-down" style={{marginLeft: '50px', fontWeight: '5em'}}>

            {this.filterArr.map((filter) => <NavFilter setFilter={this.props.setFilter} filter={filter}/>)}
          </ul>
          <ul id="nav-mobile" className="right hide-on-med-and-down" style={{marginRight: '50px'}} >
            <li>
              <Modal
                ref={this.modalRef}
                fixedFooter
                trigger = {<a href="sass.html"><i className="material-icons left">create</i>식당 등록</a>}
                actions = {<div><Button modal = 'close' style={buttonStyle} >Close</Button><Button modal = 'close' style={buttonStyle} onClick={this.hanldeSubmit}>POST</Button></div>}
                style={this.modalStyle}
              >
                <h4 style={{textAlign: 'center'}}>식당 등록</h4>
                <br /><br />
                <Row>
                  음식점
                  <input
                    ref={this.modalInput}
                    onChange = {this.onChange}
                    placeholder = '음식점 이름을 적어주세요!'
                    id = 'input'
                  />
                  {this.state.mapData.length ? this.state.mapData.map((data) => {
                    return <List
                      place={data}
                      onClick = {this.onClickHandler}
                    />
                  }) : '' }
                  <br /><br />

                  <Input name='group1' type='radio' value='korean' label='한식' className='with-gap' />
                  <Input name='group1' type='radio' value='western' label='양식' className='with-gap' />
                  <Input name='group1' type='radio' value='japanese' label='일식' className='with-gap' />
                  <Input name='group1' type='radio' value='chinese' label='중식' className='with-gap' />
                  <Input name='group1' type='radio' value='etc' label='기타' className='with-gap' />

                  <br /><br />
                  <Rating
                    emptySymbol = {<img src="/img/star-empty.png" className="icon" />}
                    fullSymbol = {<img src="/img/star-full.png" className="icon" />}
                    onChange = { rate => {
                      this.data.rating = rate
                    }
                    }/>
                  <br /><br />
                    음식의 맛을 평가해주세요!
                  <textarea
                    ref={this.modalTextArea}
                    rows='7'
                    cols='15'
                    label='review'
                    style={{width:'100%', height:'15%'}}
                    onChange={this.handleChange}
                  />
                </Row>
              </Modal>
            </li>
          </ul>
          <div id='nav_bottom_line'/>
        </div>
      </nav>
    );
  }
}





export default Nav;

