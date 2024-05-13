export class GlobalData {
  public static instance: GlobalData = new GlobalData();
  public currLand: any = null;
  public nextLand: any = null;

  public isPoliceConcatThief: boolean = false;
  public isThiefConcatPolice: boolean = false;

  public gamedata: any = null;

  public clear() {
    this.currLand = null;
    this.nextLand = null;
  }
}
