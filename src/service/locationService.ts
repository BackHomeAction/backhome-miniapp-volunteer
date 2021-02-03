import store from "@/store";
import Ws from "../utils/websocket";

const getLocation = () => {
  return new Promise<UniApp.GetLocationSuccess>((resolve, reject) => {
    uni.getLocation({
      type: "wgs84",
      altitude: true,
      success: (data) => {
        resolve(data);
      },
      fail() {
        reject();
      },
    });
  });
};

export default class LocationReporter {
  ws: Ws | null = null;
  interval: number = 0;

  constructor() {
    console.log("Location reporter service inited.");
  }

  intervalFunction = async () => {
    const logged = store.getters.logged;
    if (!logged) return;

    const location = await getLocation();
    this.sendMessage({
      longitude: location.longitude,
      latitude: location.latitude,
    });
    console.debug("location reporter triggered.", location);
  };

  start = () => {
    if (this.interval) return;
    console.log("Location reporter service started.");
    this.ws = new Ws();
    this.ws.connect();
    this.interval = setInterval(this.intervalFunction, 10000);
  };

  end = () => {
    console.log("Location reporter service ended.");
    this.ws && this.ws.disconnect();
    clearInterval(this.interval);
    this.interval = 0;
  };

  sendMessage = (data: Object | string) => {
    const message = data instanceof Object ? JSON.stringify(data) : data;
    this.ws && this.ws.send("/home/volunteer/place", message);
  };
}
