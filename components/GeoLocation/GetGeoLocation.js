import { geolocated } from "react-geolocated";
function GetGeoLocation(props) {
  return !props.isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !props.isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : props.coords ? (
    <div>
      {props.coords.latitude},{props.coords.longitude}
    </div>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GetGeoLocation);
