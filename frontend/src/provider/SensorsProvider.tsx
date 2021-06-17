import { Motion, Geolocation } from "@capacitor/core";
import React, { useEffect } from "react";
import { LocationType, ContextSensorsType } from "./type";
import { toRadians } from 'ol/math';
import StorageService from "../services/storage";
import { Sensor } from "../data/sensors";
import ApiService from "../services/apiService";

export const SensorsContext = React.createContext<ContextSensorsType | null>(null);

const MapProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [apiService] = React.useState<ApiService>(new ApiService());
    const [sensors, setSensorsLocal] = React.useState(new Array<Sensor>());
    const [storageService] = React.useState(new StorageService());
    const [teams, setTeamsLocal] = React.useState<Array<string>>([]);
    const [team, setTeamLocal] = React.useState<string>("");

    async function loadData() {
        var sensorsTemp = await storageService.getSensorLocal();
        if(sensorsTemp.length === 0) {
            sensorsTemp = await apiService.loadSensors();
        }
        setSensors(sensorsTemp);
        setTeams(await storageService.getTeams());
        setTeam(await storageService.getTeam());
    }

    useEffect(() => {
        loadData();
    }, []);

    const setSensors = async (sensorsList: Array<Sensor>) => {
        setSensorsLocal(sensorsList);
        storageService.saveSensorLocal(sensorsList);
    }

    const setTeams = async (teams: Array<string>) => {
        setTeamsLocal(teams);
        storageService.saveTeams(teams);
    }

    const setTeam = async (team: string) => {
        setTeamLocal(team);
        storageService.saveTeam(team);
    }

    return (
        <SensorsContext.Provider value={{
            sensors,
            setSensors,
            teams,
            setTeams,
            team,
            setTeam,
        }}>
            {children}
        </SensorsContext.Provider>
    );
};

export default MapProvider;