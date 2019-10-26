import React, { useRef, useEffect } from 'react';
import './map.css';
import codestatesImg from '../../img/codestates.ico';
import markerImg from '../../img/marker.png';

let map, infoWindow, line, markers;
const Map = (props) => {
  const mapContainer = useRef(null);
  const { restaurants, restaurant, dispatch } = props;
  const centerCoordinate = new window.daum.maps.LatLng(37.545486, 127.051632);

  useEffect(() => {
    changeRestaurantEventHandler();
    map && map.panTo(getRestaurantCoordinate());
  }, [restaurant]);

  useEffect(() => {
    initailMarkers();
    map || initMap();
  }, [restaurants]);

  const initMap = () => {
    map = setMap(centerCoordinate);
    const centerMarkerImg = makeMarkerImage(codestatesImg);
    const centerMarker = new window.daum.maps.Marker({position: centerCoordinate, image: centerMarkerImg, zIndex: 3});
    initialMarkers();
    centerMarker.setMap(map);
  };

  const setMap = (centerCoordinate) => {
    const options = {
      center: centerCoordinate,
      level: 4
    };

    return new window.daum.maps.Map(mapContainer.current, options);
  };

  const changeRestaurantEventHandler = () => {
    infoWindow && infoWindow.setMap(null);
    line && line.setMap(null);

    if (restaurant) {
      makeLine();
      makeInfoWindow();
    }
  };

  const makeMarkerImage = (imgSrc) => {
    const imageSize = new window.daum.maps.Size(40, 40);
    return new window.daum.maps.MarkerImage(imgSrc, imageSize);
  };

  const initialMarkers = () => {
    Array.isArray(markers) && markers.forEach(marker => marker.setMap(null));
    markers = [];

    const markerImage = makeMarkerImage(markerImg);
    markers = restaurants.map(restaurant => {
      const markerPosition = new window.daum.maps.LatLng(restaurant.map.latitude, restaurant.map.longitude);
      let marker =new window.daum.maps.Marker({
        position: markerPosition,
        image: markerImage,
        title: restaurant.name,
        zIndex: 1
      });

      window.daum.maps.event.addListener(marker, 'click', function() {
        dispatch({type: 'setRestaurant', restaurant});
      });

      marker.setMap(map);

      return marker;
    })
  };

  const makeLine = () => {
    const selectedMarkerCoordinate = getRestaurantCoordinate();

    line = new window.daum.maps.Polyline({
      path: [centerCoordinate, selectedMarkerCoordinate],
      strokeWeight: 5,
      strokeColor: 'red',
      strokeOpacity: 0.7,
      strokeStyle: 'solid'
    });

    line.setMap(map);
  };

  const makeInfoWindow = () => {
    const selectedMarkerCoordinate = getRestaurantCoordinate();
    const content = `<div class="dotOverlay"> 직선 거리 <span class="number">${Math.floor(line.getLength())}</span>m</div>`;

    infoWindow = new window.daum.maps.CustomOverlay({
      content: content,
      position: selectedMarkerCoordinate,
      yAnchor: 2.3,
      zIndex: 2
    });

    infoWindow.setMap(map);
  };

  const getRestaurantCoordinate = () => {
    if (!restaurant) return centerCoordinate;

    const { latitude, longitude } = restaurant.map;
    return new window.daum.maps.LatLng(latitude, longitude);
  };

  return (
    <div className="col s9" style={{backgroundColor: "grey", paddingLeft:'5px', paddingRight:'5px'}}>
      <div ref={mapContainer} id="map" style={{width: '100%', height: '100vh'}} />
    </div>
  )
};

export default Map;