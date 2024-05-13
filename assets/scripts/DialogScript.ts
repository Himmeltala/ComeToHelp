import { _decorator, Component, director, tween, v3 } from "cc";
import { GlobalData } from "./GlobalData";
const { ccclass, property } = _decorator;

@ccclass("DialogScript")
export class DialogScript extends Component {
  show() {
    this.node.active = true;
    this.node.scale = v3(0, 0, 1);
    tween(this.node)
      .to(0.2, { scale: v3(1, 1, 1) })
      .start();
  }

  hide() {
    tween(this.node)
      .to(0.2, { scale: v3(0, 0, 1) })
      .start()
      .call(() => {
        this.node.active = false;
      });
  }

  aggressiveView() {
    GlobalData.instance.gamedata.user.barrier.currentSteps -= 1;
    this.hide();
  }

  aggressiveExchange() {
    GlobalData.instance.gamedata.user.barrier.availableTimes += 1;
    this.hide();
  }

  loadScene(event: Event, data: string) {
    director.loadScene(data);
  }
}
