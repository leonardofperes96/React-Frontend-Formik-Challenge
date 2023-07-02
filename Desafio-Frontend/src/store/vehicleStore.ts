import { makeAutoObservable } from "mobx";
import { VehicleInterface } from "../types/types";
import { toast } from "react-toastify";

class AppStore {
  vehicles: Pick<
    VehicleInterface,
    | "name"
    | "model"
    | "manufacturer"
    | "cost_in_credits"
    | "consumables"
    | "vehicle_class"
  >[] = [];
  isLoading = false;
  currPage = 1;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchVehicles(): Promise<void> {
    this.isLoading = true;
    try {
      const response = await fetch(
        `https://swapi.dev/api/vehicles/?page=${this.currPage}`
      );
      const data = await response.json();

      const { results, next } = data;
      const extractedData = results.map((vehicle: VehicleInterface) => {
        const {
          name,
          model,
          manufacturer,
          cost_in_credits,
          consumables,
          vehicle_class,
        } = vehicle;
        return {
          name,
          model,
          manufacturer,
          cost_in_credits,
          consumables,
          vehicle_class,
        };
      });
      this.vehicles.push(...extractedData);
      if (next) {
        this.currPage++;
      }
    } catch (err) {
      toast.error("Error getting the Vehicles.");
    } finally {
      this.isLoading = false;
    }
  }

  loadMoreVehicles(): void {
    this.fetchVehicles();
  }
}

const appStore = new AppStore();

export default appStore;
