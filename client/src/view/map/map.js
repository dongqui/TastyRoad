import React, { Component } from 'react';
import './map.css';

class Map extends Component {

  markers = [];
  openedWindow;
  drawedLine;

  makeMarkerImage = function(imageName, isCenter) {
    let imageSrc = window.location.origin + '/img/' + imageName;
    let imageSize;
    if (isCenter) {
      imageSize  = new window.daum.maps.Size(60, 60); // 마커이미지의 크기
    } else {
      imageSize = new window.daum.maps.Size(40, 40); // 마커이미지의 크기
    }



    return new window.daum.maps.MarkerImage(imageSrc, imageSize);
  };

  makeMarkers = function() {
    const that = this;
    that.markers.forEach((marker, idx) => {
      marker.setMap(null);
    });
    that.markers = [];

    const markerImage = this.makeMarkerImage('marker.png', false);
    this.props.restaurants.forEach((restaurant, idx) => {
      const markerPosition = new window.daum.maps.LatLng(restaurant.map.latitude, restaurant.map.longitude);
      let marker =new window.daum.maps.Marker({
        position: markerPosition,
        image: markerImage,
        title: restaurant.name,
        zIndex: 1
      });

      that.markers.push(marker);

      window.daum.maps.event.addListener(marker, 'click', function() {
        that.props.setSelectedId(that.markers.indexOf(marker));
        that.clickEventHandling(that.map, marker);
      });

      marker.setMap(this.map);

    })

  };

  makeLine = function(marker) {
    const codestatesLating = new window.daum.maps.LatLng(37.545486, 127.051632);
    const selectedMarkerLating = marker.getPosition();

    return new window.daum.maps.Polyline({
      path: [codestatesLating, selectedMarkerLating],
      strokeWeight: 5,
      strokeColor: 'red',
      strokeOpacity: 0.7,
      strokeStyle: 'solid'
    });
  };

  makeInfoWindow = function(position, content) {
    return new window.daum.maps.CustomOverlay({
      content: content,
      position: position,
      yAnchor: 2.3,
      zIndex: 2
    });
  };

  makeMap = function() {
    let markerImage = this.makeMarkerImage('codestates.ico', true);

    let centerPosition = new window.daum.maps.LatLng(37.545486, 127.051632);// 패스트 파이브 성수점 좌표
    const container = document.getElementById('map');
    let options = {
      center: centerPosition,
      level: 4
    };

    this.map = new window.daum.maps.Map(container, options);

    const centerMarker = new window.daum.maps.Marker({position: centerPosition, image: markerImage, zIndex: 3});
    centerMarker.setMap(this.map);
  };

  clickEventHandling = (map, marker) => {
    this.initailizeMap();
    let lating = marker.getPosition();

    this.drawedLine = this.makeLine(marker);
    this.drawedLine.setMap(map);

    let content = `<div class="dotOverlay"> 직선 거리 <span class="number">${Math.floor(this.drawedLine.getLength())}</span>m</div>`;


    this.openedWindow = this.makeInfoWindow(lating, content);
    this.openedWindow.setMap(map);

    map.panTo(lating);
  };

  componentDidMount() {
    this.makeMap();
  }
  
  initailizeMap() {
    if (this.openedWindow) {
      this.openedWindow.setMap(null);
    }
    if (this.drawedLine) {
      this.drawedLine.setMap(null);
    }
  }

  componentDidUpdate() {
    this.initailizeMap();
    this.makeMarkers();
    if (this.props.selectedId !== -1) {
      this.clickEventHandling(this.map, this.markers[this.props.selectedId]);
    } else {
      let centerPosition = new window.daum.maps.LatLng(37.545486, 127.051632);
      this.map.panTo(centerPosition);
    }
  }

  render() {
    return (
      <div className="col s9" style={{backgroundColor: "grey", paddingLeft:'5px', paddingRight:'5px'}}>
        <div id="map" style={{width: '100%', height: '100vh'}} />
      </div>
    )
  }
}

export default Map;