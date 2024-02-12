"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function MyComponent() {
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const markerPosition = {
    lat: -3.745,
    lng: -38.523,
  };
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((poition) => {
      setLat(poition.coords.latitude);
      setLng(poition.coords.longitude);
    });
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Marker component to add a location */}
      <Marker position={markerPosition} />

      {/* Child components, such as additional markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
