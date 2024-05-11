import {
  _decorator,
  Component,
  EventTouch,
  Node,
  Contact2DType,
  Sprite,
  Collider2D,
  tween,
  find
} from "cc";
import { GlobalData } from "./GlobalData";
import { LandScript } from "./LandScript";
import { TheifScript } from "./TheifScript";
import { SuccessDialog } from "./SuccessDialog";
const { ccclass, property } = _decorator;

@ccclass("PoliceScript")
export class PoliceScript extends Component {
  @property(Sprite)
  public currLand: Sprite = null;

  private theif = null;

  start() {
    const collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onContact, this);
    }

    this.node.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
      GlobalData.instance.currLand = this.currLand;
    });

    this.theif = find("Canvas/小偷").getComponent(TheifScript);
  }

  onContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    GlobalData.instance.isPoliceConcatTheif = true;
    find("Canvas/抓捕成功对话框").getComponent(SuccessDialog).show();
  }

  isMoveable(currLand: LandScript, nextLand: LandScript) {
    const currLandLines = [
      currLand.leftLine?.name,
      currLand.rightLine?.name,
      currLand.topLine?.name,
      currLand.bottomLine?.name
    ];

    const nextLandLines = [
      nextLand.leftLine?.name,
      nextLand.rightLine?.name,
      nextLand.topLine?.name,
      nextLand.bottomLine?.name
    ];

    for (let i = 0; i < currLandLines.length; i++) {
      if (currLandLines[i]) {
        for (let j = 0; j < nextLandLines.length; j++) {
          if (currLandLines[i] === nextLandLines[j]) {
            return true;
          }
        }
      }
    }
    return false;
  }

  shift() {
    const currLand = GlobalData.instance.currLand.getComponent(LandScript);
    const nextLand = GlobalData.instance.nextLand.getComponent(LandScript);

    if (this.isMoveable(currLand, nextLand)) {
      tween(this.node).to(0.3, { position: nextLand.node.getPosition() }).start();
      GlobalData.instance.clear();
      this.currLand = nextLand;

      this.scheduleOnce(() => {
        this.theif.shift();
      }, 0.4);
    }
  }
}
