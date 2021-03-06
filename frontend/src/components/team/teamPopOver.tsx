import React, { useContext, useState } from "react";
import {
  IonIcon,
  IonPopover,
  IonButton,
  IonInput,
} from "@ionic/react";
import { push } from "ionicons/icons";
import { ContextSensorsType } from "../../provider/type";
import { SensorsContext } from "../../provider/SensorsProvider";



const TeamPopOver: React.FC = () => {
  const { teams, setTeams } = useContext(SensorsContext) as ContextSensorsType;
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  function insertTeam() {
    var inputTeam: HTMLInputElement = document.getElementById(
      "TeamInput"
    ) as HTMLInputElement;
    if (inputTeam.value != "") {
      const newArray = teams.concat(inputTeam.value);
      setTeams(newArray);
      inputTeam.value = "";
    }
  }

  return (
    <>
      <IonPopover
        isOpen={showPopover.open}
        event={showPopover.event}
        onDidDismiss={() => {
          setShowPopover({ open: false, event: undefined });
        }}
      >
        <IonInput placeholder="Inserisci nuovo team" id="TeamInput" />
        <IonButton
          onClick={(e) => {
            insertTeam();
            setShowPopover({ open: false, event: e.nativeEvent });
          }}
        >
          inserisci
        </IonButton>{" "}
      </IonPopover>
      <IonButton
        onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}
      >
        Inserisci nuovo team
        <IonIcon icon={push} />
      </IonButton>
    </>
  );
};

export default TeamPopOver;
