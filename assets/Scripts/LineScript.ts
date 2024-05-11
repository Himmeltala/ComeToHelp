import { _decorator, Component, Node, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LineScript")
export class LineScript extends Component {
  @property(Sprite)
  public leftLine: Sprite = null;

  @property(Sprite)
  public rightLine: Sprite = null;

  start() {}

  update(deltaTime: number) {}
}
