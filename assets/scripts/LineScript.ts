import { _decorator, Component, Node, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LineScript")
export class LineScript extends Component {
  @property(Sprite)
  public leftLand: any = null;

  @property(Sprite)
  public rightLand: any = null;
}
