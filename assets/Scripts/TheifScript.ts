import { _decorator, Component, Node, Sprite, tween } from "cc";
import { GlobalData } from "./GlobalData";
import { LandScript } from "./LandScript";
import { LineScript } from "./LineScript";
const { ccclass, property } = _decorator;

@ccclass("TheifScript")
export class TheifScript extends Component {
  @property(Sprite)
  public currRole: Sprite = null;
  @property(Sprite)
  public currLand: Sprite = null;

  start() {
    GlobalData.ins.theifRole = this.getComponent(TheifScript);
  }

  private shuffledArray = [];
  private index = 0;

  shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  randomMove() {
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
      currLand.bottomLine?.getComponent(LineScript).rightLine,
    ].filter((item) => {
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

    this.shuffledArray = this.shuffleArray(currLandLines);

    if (this.index >= this.shuffledArray.length) {
      this.shuffledArray = this.shuffleArray(currLandLines); // 重新随机化地块数组
      this.index = 0; // reset index
    }

    const selectedLand = this.shuffledArray[this.index++];

    tween(this.node)
      .to(0.5, { position: selectedLand.node.getPosition() })
      .start();

    this.currLand = selectedLand;
  }

  update(deltaTime: number) {}
}
