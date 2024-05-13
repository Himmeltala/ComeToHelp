import { _decorator, Component, Collider2D, Sprite, tween, Contact2DType, find } from "cc";
import { GlobalData } from "./GlobalData";
import { LineScript } from "./LineScript";
import { LandScript } from "./LandScript";
const { ccclass, property } = _decorator;

@ccclass("ThiefScript")
export class ThiefScript extends Component {
  @property(Sprite)
  public currLand: any = null;

  private shuffledArray = [];
  private shuffledIndex = 0;

  start() {
    const collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onContact, this);
    }
  }

  onContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    GlobalData.instance.isThiefConcatPolice = true;
  }

  shuffle(array: any[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  shift() {
    if (GlobalData.instance.isPoliceConcatThief || GlobalData.instance.isThiefConcatPolice) {
      GlobalData.instance.isPoliceConcatThief = false;
      GlobalData.instance.isThiefConcatPolice = false;
      return;
    }

    const currLand = this.currLand.getComponent(LandScript);
    const names = new Set();

    const currLandLines = [
      currLand.topLine?.getComponent(LineScript).leftLand,
      currLand.topLine?.getComponent(LineScript).rightLand,
      currLand.bottomLine?.getComponent(LineScript).leftLand,
      currLand.bottomLine?.getComponent(LineScript).rightLand,
      currLand.leftLine?.getComponent(LineScript).leftLand,
      currLand.leftLine?.getComponent(LineScript).rightLand,
      currLand.rightLine?.getComponent(LineScript).leftLand,
      currLand.rightLine?.getComponent(LineScript).rightLand
    ].filter(item => {
      if (item) {
        let name = item.name;
        if (names.has(name) || name === this.currLand.name) {
          return false;
        } else {
          names.add(name);
          return true;
        }
      }
    });

    this.shuffledArray = this.shuffle(currLandLines);

    if (this.shuffledIndex >= this.shuffledArray.length) {
      this.shuffledArray = this.shuffle(currLandLines);
      this.shuffledIndex = 0;
    }

    this.currLand = this.shuffledArray[this.shuffledIndex++];
    tween(this.node).to(0.3, { position: this.currLand.node.getPosition() }).start();
  }
}
