import { _decorator, Component, EventTouch, find, Node, Sprite } from "cc";
import { GlobalData } from "./GlobalData";
import { PoliceScript } from "./PoliceScript";
const { ccclass, property } = _decorator;

@ccclass("LandScript")
export class LandScript extends Component {
  @property(Sprite)
  public leftLine: any = null;

  @property(Sprite)
  public rightLine: any = null;

  @property(Sprite)
  public topLine: any = null;

  @property(Sprite)
  public bottomLine: any = null;

  start() {
    this.node.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
      GlobalData.instance.nextLand = this.getComponent(LandScript);
      find("Canvas/Content/警察").getComponent(PoliceScript).shift();
    });
  }
}
