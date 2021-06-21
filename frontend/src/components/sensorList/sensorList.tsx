import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useContext } from "react";
import { ContextSensorsType } from "../../provider/type";
import SensorItem from "./sensoritem/SensorItem";
import "../../pages/Home.css";
import { SensorsContext } from "../../provider/SensorsProvider";

const SensorList: React.FC = () => {
  const { team, teams, setTeam, sensors, setSensors } = useContext(
    SensorsContext
  ) as ContextSensorsType;

  function test(val: string) {
    sensors.forEach((e) => {
      if (e.team != val && val != "any") {
        e.isCentroidVisible = false;
        e.isHeatmapVisible = false;
        e.isMarkerVisible = false;
      } else {
        e.isCentroidVisible = true;
        e.isHeatmapVisible = true;
        e.isMarkerVisible = true;
      }
    })
    setSensors(sensors);
  }

  return (
    <IonContent id="ion-content">
      <div>
        <IonItem>
          <IonLabel>Team</IonLabel>
          <IonSelect
            value={team}
            okText="Select"
            cancelText="Cancel"
            onIonChange={(val) => {
              setTeam(val.detail.value);
              test(val.detail.value);
            }}
          >
            <IonSelectOption value={"any"}>Any</IonSelectOption>
            {teams.map((e) => (
              <IonSelectOption value={e}>{e}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonButton expand="full" routerLink="/welcome">
          MAP
        </IonButton>
        <IonButton expand="full" routerLink="/teams">
          TEAMS
        </IonButton>
      </div>
      <IonList>
        {team == "any"
          ? sensors.map((e) => <SensorItem key={e.id} sensor={e} />)
          : sensors.map((e) =>
            e.team == team ? <SensorItem key={e.id} sensor={e} /> : null
          )}
      </IonList>
    </IonContent>
  );
};

export default SensorList;
