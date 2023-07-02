
import { VehicleInterface } from "../types/types";
import styles from "./VehicleItem.module.css";
import { Link } from "react-router-dom";

const VehicleItem = ({
  name,
  model,
  manufacturer,
  cost_in_credits,
  consumables,
  vehicle_class,
}: VehicleInterface) => {
  return (
    <div className={styles.card}>
      <div className={styles.vehicle_container}>
        <h3>{name}</h3>
        <p>
          <span className={styles.span}>Model:</span> {model}
        </p>
        <p>
          <span className={styles.span}>Class: </span>
          {vehicle_class}
        </p>
        <p>
          <span className={styles.span}>Time of Supplies:</span> This car have{" "}
          {consumables}
        </p>
        <p>
          <span className={styles.span}>Cost in credits:</span>{" "}
          {cost_in_credits}
        </p>
        <p className={styles.manufacturer}>
          <span className={styles.span}>Manufacturer</span>: {`${manufacturer}`}
        </p>
        <button>
          <Link className={styles.link} to="/checkout">
            Checkout
          </Link>
        </button>
      </div>
    </div>
  );
};

export default VehicleItem;
