import { _decorator, Component, EventTouch, Node, Sprite } from "cc";
import { GlobalData } from "./GlobalData";
import { PoliceScript } from "./PoliceScript";
import { TheifScript } from "./TheifScript";
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

  isNext(currLand: LandScript, nextLand: LandScript) {
    const currLandLines = [
      currLand.leftLine?.name,
      currLand.rightLine?.name,
      currLand.topLine?.name,
      currLand.bottomLine?.name,
    ];

    const nextLandLines = [
      nextLand.leftLine?.name,
      nextLand.rightLine?.name,
      nextLand.topLine?.name,
      nextLand.bottomLine?.name,
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

  start() {
    this.node.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
      const police = GlobalData.ins.policeRole.getComponent(PoliceScript);
      const currLand = GlobalData.ins.currLand.getComponent(LandScript);
      const nextLand = this.getComponent(LandScript);
      GlobalData.ins.nextLand = nextLand;

      if (this.isNext(currLand, nextLand)) {
        police.node.setPosition(nextLand.node.getPosition());
        police.currLand = nextLand;
        GlobalData.ins.clear();

        const theif = GlobalData.ins.theifRole.getComponent(TheifScript);
        theif.randomMove();
      }
    });
  }

  update(deltaTime: number) {}
}
