import { _decorator, Component, EventTouch, find, Node, Sprite } from "cc";
import { GlobalData } from "./GlobalData";
import { PoliceScript } from "./PoliceScript";
const { ccclass, property } = _decorator;

@ccclass("LandScript")
export class LandScript extends Component {
  @property(Sprite)
  public leftLine: Sprite = null;

  @property(Sprite)
  public rightLine: Sprite = null;

  @property(Sprite)
  public topLine: Sprite = null;

  @property(Sprite)
  public bottomLine: Sprite = null;

  start() {
    this.node.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
      GlobalData.instance.nextLand = this.getComponent(LandScript);

      find("Canvas/警察").getComponent(PoliceScript).shift();
    });
  }

  update(deltaTime: number) {}
}
