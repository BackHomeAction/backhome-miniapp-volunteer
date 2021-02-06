import { ActionTypes } from "@/enums/actionTypes";
import { MutationTypes } from "@/enums/mutationTypes";
import { SocketStateTypes } from "@/enums/socketStateTypes";
import store from "@/store";
import { showModal } from "@/utils/helper";
import Ws from "../utils/websocket";

const getLocation = () => {
  return new Promise<UniApp.GetLocationSuccess>((resolve, reject) => {
    uni.getLocation({
      type: "gcj02",
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

/**
 * WebSocket 服务
 *
 * @export
 * @class WebsocketService
 */
export default class WebsocketService {
  ws: Ws | null = null;
  interval: number = 0;

  constructor() {
    console.log("WebSocket service inited.");
  }

  /**
   * 定期任务，用于上报位置信息
   *
   * @memberof WebsocketService
   */
  intervalFunction = async () => {
    const logged = store.getters.logged;
    if (!logged) return;

    const location = await getLocation();
    store.commit(MutationTypes.SET_LOCATION, {
      longitude: location.longitude,
      latitude: location.latitude,
    });
    this.sendMessage("/home/volunteer/place", {
      longitude: location.longitude,
      latitude: location.latitude,
    });
    console.debug("Location reporter triggered.", location);
  };

  /**
   * 用户订阅回调处理
   *
   * @param {string} res
   * @memberof WebsocketService
   */
  newUserInfoCallback = async (res: any) => {
    const data = JSON.parse(res.body);
    console.log("Websocket user subscription callback data:", data);
    if (data.status === SocketStateTypes.NEW_MISSION) {
      showModal("提示", "您有新的任务，请及时到任务列表查看");
    }
  };

  /**
   * 启动服务
   *
   * @memberof WebsocketService
   */
  start = () => {
    if (this.interval) return;
    const volunteerId = store.getters.userInfo.id;
    this.ws = new Ws();
    this.ws.connect();
    this.ws.subscribe(
      `/user/${volunteerId}/volunteer`,
      this.newUserInfoCallback
    );
    setTimeout(this.intervalFunction, 2000); // 2s 后先发一次位置
    setTimeout(() => {
      store.dispatch(ActionTypes.getCount);
    }, 5000); // 5s 后刷新首页数量统计
    this.interval = setInterval(this.intervalFunction, 10000);

    console.log("WebSocket service started.");
  };

  /**
   * 停止服务
   *
   * @memberof WebsocketService
   */
  end = () => {
    console.log("Location reporter service ended.");
    this.ws && this.ws.disconnect();
    clearInterval(this.interval);
    this.interval = 0;
  };

  /**
   * 发送消息
   *
   * @param {string} destination
   * @param {(Object | string)} data
   * @memberof WebsocketService
   */
  sendMessage = (destination: string, data: Object | string) => {
    const message = data instanceof Object ? JSON.stringify(data) : data;
    this.ws && this.ws.send(destination, message);
  };
}
