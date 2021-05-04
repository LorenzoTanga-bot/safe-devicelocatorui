import {
    IonItem,
    IonLabel,
    IonNote
    } from '@ionic/react';
  import { Sensor } from '../data/sensors';
  import './MessageListItem.css';
  
  interface SensorListItemProps {
    sensor: Sensor;
  }
  
  const SensorListItem: React.FC<SensorListItemProps> = ({ sensor }) => {
    return (
      <IonItem routerLink={`/message/${sensor.id}`} detail={false}>
        <div slot="start" className="dot dot-unread"></div>
        <IonLabel className="ion-text-wrap">
          <h2>
            {sensor.name}
            <span className="date">
              <IonNote>{sensor.status ? "true" : "false"}</IonNote>
            </span>
          </h2>
          <h3>{sensor.coordinate}</h3>
        </IonLabel>
      </IonItem>
    );
  };
  
  export default SensorListItem;
  