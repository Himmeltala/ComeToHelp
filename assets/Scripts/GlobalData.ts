import { Sprite } from "cc";

export class GlobalData {
  public static ins: GlobalData = new GlobalData();
  public theifRole: any = null;
  public currLand: any = null;
  public policeRole: any = null;
  public nextLand: any = null;

  public clear() {
    this.currLand = null;
    this.policeRole = null;
    this.nextLand = null;
  }
}
