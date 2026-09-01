import * as Location from "expo-location";

export const locationService = {
  async requestLocationPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Error requesting location permission:", error);
      return false;
    }
  },

  async getCurrentLocation(): Promise<Location.LocationObject | null> {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        const granted = await this.requestLocationPermission();
        if (!granted) {
          return null;
        }
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 100,
      });

      return location;
    } catch (error) {
      console.error("Error getting current location:", error);
      return null;
    }
  },

  async getAddressFromCoordinates(
    latitude: number,
    longitude: number
  ): Promise<Location.LocationObject | null> {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (address.length > 0) {
        return {
          coords: {
            latitude,
            longitude,
            accuracy: 0,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        };
      }

      return null;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return null;
    }
  },

  async geocodeAddress(address: string): Promise<Location.LocationGeocodedLocation[] | null> {
    try {
      const results = await Location.geocodeAsync(address);
      return results.length > 0 ? results : null;
    } catch (error) {
      console.error("Error geocoding address:", error);
      return null;
    }
  },

  async watchLocation(callback: (location: Location.LocationObject) => void): Promise<Location.LocationSubscription> {
    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 100,
        },
        callback
      );

      return subscription;
    } catch (error) {
      console.error("Error watching location:", error);
      throw error;
    }
  },
};
