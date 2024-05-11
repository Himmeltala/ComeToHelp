import {
  _decorator,
  Component,
  EventTouch,
  Node,
  Contact2DType,
  IPhysics2DContact,
  Sprite,
  Collider2D,
} from "cc";
import { GlobalData } from "./GlobalData";
const { ccclass, property } = _decorator;

@ccclass("PoliceScript")
export class PoliceScript extends Component {
  @property(Sprite)
  public currRole: Sprite = null;
  @property(Sprite)
  public currLand: Sprite = null;

  start() {
    const collider = this.getComponent(Collider2D);

    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
      collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
      collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
    }

    this.node.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
      GlobalData.ins.currLand = this.currLand;
      GlobalData.ins.policeRole = this.currRole;
    });
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // 只在两个碰撞体开始接触时被调用一次
    console.log("onBeginContact");
  }

  onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // 只在两个碰撞体结束接触时被调用一次
    console.log("onEndContact");
  }

  onPreSolve(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // 每次将要处理碰撞体接触逻辑时被调用
    console.log("onPreSolve");
  }

  onPostSolve(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // 每次处理完碰撞体接触逻辑时被调用
    console.log("onPostSolve");
  }

  update(deltaTime: number) {}
}
