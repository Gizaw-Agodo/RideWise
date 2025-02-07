import { DriverStore, LocationStore } from "@/types/type";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  destinationAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  setUserLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      userAddress: address,
      userLongitude: longitude,
      userLatitude: latitude,
    }));
  },
  setDestinationLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      destinationAddress: address,
      destinationLatitude: latitude,
      destinationLongitude: longitude,
    }));
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [],
  selectedDriver: null,
  setSelectedDriver: (driverId) => {
    set(() => ({
      selectedDriver: driverId,
    }));
  },
  setDrivers: (drivers) => {
    set(() => ({
      drivers,
    }));
  },
  clearSelectedDriver: () => {
    set(() => ({ selectedDriver: null }));
  },
}));
