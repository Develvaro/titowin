

import { GeoSearchControl, OpenStreetMapProvider  } from 'leaflet-geosearch';
import {connect} from 'react-redux';
import styled from 'styled-components';
import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './leaflet-geosearch.css';

import {setLeafletPlace} from '../actions';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;


class Map extends React.Component {
  
  handleShow(parameter){

    const leaflet =  {lat: parseFloat(parameter.location.x), lon: parseFloat(parameter.location.y)}
    console.log(leaflet);
  }
  
  handleDrag(parameter){
  
    const leaflet = {lat: parameter.location.lat, lon: parameter.location.lng}
    console.log(leaflet);
    //console.log(leaflet);
  }
  

  componentDidMount() {

    var { setLeafletPlace} = this.props;
    

    const provider = new OpenStreetMapProvider();

    var map = L.map('map', {
      center: [58,16],
      zoom: 6,
      zoomControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      detectRetina: true,
      maxZoom: 20,
      maxNativeZoom: 17
    }).addTo(map)

    new GeoSearchControl({
      provider: provider,                               // required
      showMarker: true,                                   // optional: true|false  - default true
      style: 'bar',
      showPopup: true,                                   // optional: true|false  - default false
      marker: {                                           // optional: L.Marker    - default L.Icon.Default
        icon: new L.Icon.Default(),
        draggable: true,
      },
      popupFormat: ({ query, result }) => result.label,   // optional: function    - default returns result label
      maxMarkers: 1,                                      // optional: number      - default 1
      retainZoomLevel: false,                             // optional: true|false  - default false
      animateZoom: true,                                  // optional: true|false  - default true
      autoClose: true,                                   // optional: true|false  - default false
      searchLabel: 'Enter address',                       // optional: string      - default 'Enter address'
      keepResult: true,                                   // optional: true|false  - default false
    }).addTo(map);

    map.on('geosearch/showlocation', parameter => this.handleShow(parameter));
    map.on('geosearch/marker/dragend', parameter => this.handleDrag(parameter));

  }
  render() {
    return <Wrapper width={this.props.width} height={this.props.height} id="map" ></Wrapper>
  }
}

const mapDispatchToProps = dispatch => ({
  setLeafletPlace: (leafletPlace) => dispatch(setLeafletPlace(leafletPlace)),
});

const mapStateToProps = (state) => ({
  leafletPlace : state.leafletPlace,
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);


