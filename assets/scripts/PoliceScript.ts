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
import { ThiefScript } from "./ThiefScript";
import { DialogScript } from "./DialogScript";
const { ccclass, property } = _decorator;

@ccclass("PoliceScript")
export class PoliceScript extends Component {
  @property(Sprite)
  public currLand: any = null;

  start() {
    const collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onContact, this);
    }

    this.node.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
      GlobalData.instance.currLand = this.currLand;
    });
  }

  onContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    GlobalData.instance.isPoliceConcatThief = true;
    GlobalData.instance.gamedata.user.barrier.winningTimes += 1;
    // TODO 奖励
    find("Canvas/Dialogs/抓捕成功对话框").getComponent(DialogScript).show();
  }

  isMoveable(currLand: LandScript, nextLand: LandScript) {
    const currLandLines = [
      currLand.topLine?.name,
      currLand.bottomLine?.name,
      currLand.leftLine?.name,
      currLand.rightLine?.name
    ];

    const nextLandLines = [
      nextLand.topLine?.name,
      nextLand.bottomLine?.name,
      nextLand.leftLine?.name,
      nextLand.rightLine?.name
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
      // TODO 最大闯关次数减少要根据用户本次步数最大，并且用户不打算继续了才减去，否则就不减，可能中途退出，也不会扣
      if (GlobalData.instance.gamedata.user.barrier.availableTimes <= 0) {
        find("Canvas/Dialogs/达到最大闯关次数对话框").getComponent(DialogScript).show();
      } else {
        if (
          GlobalData.instance.gamedata.user.barrier.currentSteps <
          GlobalData.instance.gamedata.barrier.maxSetp
        ) {
          tween(this.node).to(0.3, { position: nextLand.node.getPosition() }).start();
          GlobalData.instance.clear();
          this.currLand = nextLand;

          this.scheduleOnce(() => {
            find("Canvas/Content/小偷").getComponent(ThiefScript).shift();
          }, 0.4);

          GlobalData.instance.gamedata.user.barrier.currentSteps += 1;
        } else {
          // TODO 如果最大次数了，选择不观看视频或使用道具，就取消之前的奖励，通过对话框的按钮确定 GlobalData 中的 reward 是否清除
          find("Canvas/Dialogs/达到最大次数对话框").getComponent(DialogScript).show();
        }
      }
    }
  }
}
