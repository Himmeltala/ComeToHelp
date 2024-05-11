import { _decorator, Component, tween, v3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SuccessDialog")
export class SuccessDialog extends Component {
  start() {}

  update(deltaTime: number) {}

  show() {
    this.node.active = true;
    console.log("show");

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
}
