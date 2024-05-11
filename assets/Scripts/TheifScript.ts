import { _decorator, Component, Collider2D, Sprite, tween, Contact2DType, find } from "cc";
import { GlobalData } from "./GlobalData";
import { LandScript } from "./LandScript";
import { LineScript } from "./LineScript";
const { ccclass, property } = _decorator;

@ccclass("TheifScript")
export class TheifScript extends Component {
  @property(Sprite)
  public currLand: Sprite = null;

  private shuffledArray = [];
  private shuffledIndex = 0;

  start() {
    const collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onContact, this);
    }
  }

  onContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    GlobalData.instance.isTheifConcatPolice = true;
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
    if (GlobalData.instance.isPoliceConcatTheif || GlobalData.instance.isTheifConcatPolice) {
      GlobalData.instance.isPoliceConcatTheif = false;
      GlobalData.instance.isTheifConcatPolice = false;
      return;
    }

    const currLand = this.currLand.getComponent(LandScript);
    const names = new Set();

    const currLandLines = [
      currLand.leftLine?.getComponent(LineScript).leftLine,
      currLand.leftLine?.getComponent(LineScript).rightLine,
      currLand.rightLine?.getComponent(LineScript).leftLine,
      currLand.rightLine?.getComponent(LineScript).rightLine,
      currLand.topLine?.getComponent(LineScript).leftLine,
      currLand.topLine?.getComponent(LineScript).rightLine,
      currLand.bottomLine?.getComponent(LineScript).leftLine,
      currLand.bottomLine?.getComponent(LineScript).rightLine
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
