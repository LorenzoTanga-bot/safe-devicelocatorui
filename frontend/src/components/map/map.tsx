import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from 'ol/proj';
import { HeatmapLayer } from "./layers/heatmap";
import { TMapProps, IMapContext, TMapState } from "./map-types";
import "ol/ol.css";
import "./map.css";
import { Markers } from "./layers/marker";
import { Plugins } from "@capacitor/core";
import { GeolocationLayer } from "./layers/position/position";
import {
  IonFab,
  IonFabButton
} from '@ionic/react';

const { Geolocation } = Plugins;


export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, TMapState> {
  private mapDivRef: React.RefObject<HTMLDivElement>;
  state: TMapState = {};

  constructor(props: TMapProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
    console.log("map created");
  }

  async componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }
    var coord = await Geolocation.getCurrentPosition();
    const map = new Map({
      target: this.mapDivRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          })
        }),
      ],
      view: new View({
        center: fromLonLat([coord.coords.longitude, coord.coords.latitude]),//([13.068309, 43.135764], 'EPSG:4326', 'EPSG:3857'),
        zoom: 15,
        maxZoom: 22,
        minZoom: 15
      }),
    });
    const mapContext: IMapContext = { map };
    this.setState({
      mapContext: mapContext,
    });
    console.log(map.getView().getCenter());

  }

  async setCenter() {
    var coord = await Geolocation.getCurrentPosition();
    this.state.mapContext?.map.getView().setCenter(fromLonLat([coord.coords.longitude, coord.coords.latitude]));
  }

  


  render() {
    console.log("map render");
    return (
      <div className="map" ref={this.mapDivRef}>
        {this.state.mapContext && (
          <MapContext.Provider value={this.state.mapContext}>
            <HeatmapLayer />
            <Markers />
            <GeolocationLayer />
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton onClick={() => this.setCenter()}>
              </IonFabButton>
            </IonFab>
          </MapContext.Provider>
        )}
      </div>
    );
  }
}
