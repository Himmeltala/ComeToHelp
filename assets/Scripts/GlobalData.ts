export class GlobalData {
  public static instance: GlobalData = new GlobalData();
  public currLand: any = null;
  public nextLand: any = null;

  public isPoliceConcatTheif: boolean = false;
  public isTheifConcatPolice: boolean = false;

  public clear() {
    this.currLand = null;
    this.nextLand = null;
  }
}
