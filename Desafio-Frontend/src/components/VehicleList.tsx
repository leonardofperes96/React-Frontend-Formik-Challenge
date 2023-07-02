import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import appStore from "../store/vehicleStore";
import VehicleItem from "./VehicleItem";
import styles from "./VehicleList.module.css";
import LoadingSpinner from "./LoadingSpinner";

const VehiclesList: React.FC = observer(() => {
  const { isLoading, vehicles } = appStore;
  useEffect(() => {
    if (appStore.currPage === 4) {
      return;
    }
    appStore.fetchVehicles();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (vehicles.length === 0) {
    return (
      <div className={styles.div}>
        <h1>No Vehicles.</h1>
      </div>
    );
  }

  return (
    <div className={styles.vehicle}>
      <h1 className="main-title">Lista de Veículos</h1>
      <div className={styles.vehicle_container}>
        {vehicles &&
          vehicles.map((vehicle, index) => (
            <VehicleItem
              key={index}
              name={vehicle.name}
              model={vehicle.model}
              manufacturer={vehicle.manufacturer}
              consumables={vehicle.consumables}
              cost_in_credits={vehicle.cost_in_credits}
              vehicle_class={vehicle.vehicle_class}
            />
          ))}
      </div>
      {appStore.currPage <= 4 && appStore.vehicles.length <= 30 ? (
        <button
          className="btn btn-small"
          onClick={() => appStore.loadMoreVehicles()}
        >
          Carregar +
        </button>
      ) : (
        ""
      )}
    </div>
  );
});
export default VehiclesList;
