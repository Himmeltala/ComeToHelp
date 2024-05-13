import { _decorator, Component, resources, instantiate, Prefab, UITransform, Size, find } from "cc";
import { ThiefScript } from "./ThiefScript";
import { LandScript } from "./LandScript";
import { PoliceScript } from "./PoliceScript";
import { LineScript } from "./LineScript";
import { GlobalData } from "./GlobalData";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  private barriers = [
    {
      name: "第一关",
      index: 0,
      maxSetp: 3,
      meta: {
        police: {
          name: "警察",
          landName: "地面-005",
          position: { x: -150, y: 200 },
          contentW: 45,
          contentH: 45
        },
        thief: {
          name: "小偷",
          landName: "地面-001",
          position: { x: 150, y: 200 },
          contentW: 45,
          contentH: 45
        },
        land: {
          eles: [
            {
              name: "地面-000",
              position: { x: 0, y: 315 },
              node: {
                left: "线条-005",
                right: "线条-000",
                top: "",
                bottom: "线条-006"
              }
            },
            {
              name: "地面-001",
              position: { x: 150, y: 200 },
              node: {
                left: "线条-000",
                right: "",
                top: "",
                bottom: "线条-001"
              }
            },
            {
              name: "地面-002",
              position: { x: 150, y: 50 },
              node: {
                left: "",
                right: "",
                top: "线条-001",
                bottom: "线条-002"
              }
            },
            {
              name: "地面-003",
              position: { x: 0, y: -55 },
              node: {
                left: "线条-003",
                right: "线条-002",
                top: "线条-007",
                bottom: ""
              }
            },
            {
              name: "地面-004",
              position: { x: -150, y: 50 },
              node: {
                left: "",
                right: "",
                top: "线条-004",
                bottom: "线条-003"
              }
            },
            {
              name: "地面-005",
              position: { x: -150, y: 200 },
              node: {
                left: "",
                right: "线条-005",
                top: "",
                bottom: "线条-004"
              }
            },
            {
              name: "地面-006",
              position: { x: 0, y: 125 },
              node: {
                left: "",
                right: "",
                top: "线条-006",
                bottom: "线条-007"
              }
            }
          ]
        },
        line: {
          eles: [
            {
              name: "线条-000",
              position: { x: 90, y: 275 },
              angle: -35,
              node: { left: "地面-000", right: "地面-001" },
              contentW: 148,
              contentH: 10
            },
            {
              name: "线条-001",
              position: { x: 150, y: 125 },
              angle: 90,
              node: { left: "地面-001", right: "地面-002" },
              contentW: 100,
              contentH: 10
            },
            {
              name: "线条-002",
              position: { x: 90, y: -20 },
              angle: 35,
              node: { left: "地面-002", right: "地面-003" },
              contentW: 148,
              contentH: 10
            },
            {
              name: "线条-003",
              position: { x: -90, y: -20 },
              angle: -35,
              node: { left: "地面-002", right: "地面-004" },
              contentW: 148,
              contentH: 10
            },
            {
              name: "线条-004",
              position: { x: -150, y: 125 },
              angle: 90,
              node: { left: "地面-004", right: "地面-005" },
              contentW: 100,
              contentH: 10
            },
            {
              name: "线条-005",
              position: { x: -90, y: 275 },
              angle: 35,
              node: { left: "地面-005", right: "地面-000" },
              contentW: 148,
              contentH: 10
            },
            {
              name: "线条-006",
              position: { x: 0, y: 220 },
              angle: -90,
              node: { left: "地面-000", right: "地面-007" },
              contentW: 140,
              contentH: 10
            },
            {
              name: "线条-007",
              position: { x: 0, y: 34 },
              angle: 90,
              node: { left: "地面-007", right: "地面-003" },
              contentW: 130,
              contentH: 10
            }
          ]
        }
      }
    },
    {
      name: "第二关",
      index: 1,
      maxSetp: 4,
      meta: {
        police: {
          name: "警察",
          landName: "地面-005",
          position: { x: -265, y: 150 },
          contentW: 80,
          contentH: 80
        },
        thief: {
          name: "小偷",
          landName: "地面-001",
          position: { x: 245, y: 100 },
          contentW: 80,
          contentH: 80
        },
        land: {
          eles: [
            {
              name: "地面-000",
              position: { x: 5, y: 269 },
              node: {
                left: "线条-005",
                right: "线条-000",
                top: "",
                bottom: "线条-006"
              }
            },
            {
              name: "地面-001",
              position: { x: 250, y: 150 },
              node: {
                left: "线条-000",
                right: "",
                top: "",
                bottom: "线条-001"
              }
            },
            {
              name: "地面-002",
              position: { x: 250, y: -100 },
              node: {
                left: "",
                right: "",
                top: "线条-001",
                bottom: "线条-002"
              }
            },
            {
              name: "地面-003",
              position: { x: 5, y: -260 },
              node: {
                left: "线条-003",
                right: "线条-002",
                top: "线条-007",
                bottom: ""
              }
            },
            {
              name: "地面-004",
              position: { x: -260, y: -100 },
              node: {
                left: "",
                right: "",
                top: "线条-004",
                bottom: "线条-003"
              }
            },
            {
              name: "地面-005",
              position: { x: -260, y: 150 },
              node: {
                left: "",
                right: "线条-005",
                top: "",
                bottom: "线条-004"
              }
            },
            {
              name: "地面-006",
              position: { x: 0, y: 0 },
              node: {
                left: "",
                right: "",
                top: "线条-006",
                bottom: "线条-007"
              }
            }
          ]
        },
        line: {
          eles: [
            {
              name: "线条-000",
              position: { x: 130, y: 215 },
              angle: -45,
              node: { left: "地面-000", right: "地面-001" },
              contentW: 180,
              contentH: 20
            },
            {
              name: "线条-001",
              position: { x: 250, y: 30 },
              angle: 90,
              node: { left: "地面-001", right: "地面-002" },
              contentW: 150,
              contentH: 20
            },
            {
              name: "线条-002",
              position: { x: 150, y: -215 },
              angle: 30,
              node: { left: "地面-002", right: "地面-003" },
              contentW: 220,
              contentH: 20
            },
            {
              name: "线条-003",
              position: { x: -150, y: -215 },
              angle: -30,
              node: { left: "地面-002", right: "地面-004" },
              contentW: 225,
              contentH: 20
            },
            {
              name: "线条-004",
              position: { x: -265, y: 30 },
              angle: 90,
              node: { left: "地面-004", right: "地面-005" },
              contentW: 145,
              contentH: 20
            },
            {
              name: "线条-005",
              position: { x: -130, y: 215 },
              angle: 30,
              node: { left: "地面-005", right: "地面-000" },
              contentW: 190,
              contentH: 20
            },
            {
              name: "线条-006",
              position: { x: 0, y: 130 },
              angle: -90,
              node: { left: "地面-000", right: "地面-007" },
              contentW: 160,
              contentH: 20
            },
            {
              name: "线条-007",
              position: { x: 0, y: -130 },
              angle: -90,
              node: { left: "地面-007", right: "地面-003" },
              contentW: 160,
              contentH: 20
            }
          ]
        }
      }
    }
  ];
  private user = {
    barrier: {
      // 当前关卡数
      index: 0,
      // 当前用户连胜次数
      winningTimes: 0,
      // 可以闯关的次数，用户成功闯关一次就减少一次，但是可以通过使用精力值兑换增加次数
      availableTimes: 0,
      // 当前用户走的步数，当currStep 大于关卡设计的步数，就需要通过观看视频或使用道具减少currStep。
      currentSteps: 0,
      // 连胜的奖励
      reward: {}
    }
  };
  private lands = [];
  private lines = [];
  private police = null;
  private thief = null;

  initGameData() {
    // TODO 异步请求存储的数据库数据
    const barrier = this.barriers[this.user.barrier.index];
    GlobalData.instance.gamedata = {
      barrier,
      user: this.user
    };

    return barrier;
  }

  async initPrefabs(barrier: any) {
    const content = find("Canvas/Content");

    try {
      await new Promise((resolve, reject) => {
        resources.load("prefabs/地面", Prefab, (err, prefab) => {
          if (err) {
            reject(err);
          } else {
            barrier.meta.land.eles.forEach((element, index) => {
              const node = instantiate(prefab);
              node.name = element.name;
              node.setPosition(element.position.x, element.position.y, 1);
              content.addChild(node);
              this.lands.push({ node: node, index: index });
            });
            resolve("");
          }
        });
      });

      await new Promise((resolve, reject) => {
        resources.load("prefabs/线条", Prefab, (err, prefab) => {
          if (err) {
            reject(err);
          } else {
            barrier.meta.line.eles.forEach((element, index) => {
              const node = instantiate(prefab);
              node.name = element.name;
              node.angle = element.angle;
              node
                .getComponent(UITransform)
                .setContentSize(new Size(element.contentW, element.contentH));
              node.setPosition(element.position.x, element.position.y, 1);
              content.addChild(node);
              this.lines.push({ node: node, index: index });
            });
            resolve("");
          }
        });
      });

      await new Promise((resolve, reject) => {
        resources.load("prefabs/警察", Prefab, (err, prefab) => {
          if (err) {
            reject(err);
          } else {
            const node = instantiate(prefab);
            node.name = barrier.meta.police.name;
            node
              .getComponent(UITransform)
              .setContentSize(new Size(barrier.meta.police.contentW, barrier.meta.police.contentH));
            node.setPosition(barrier.meta.police.position.x, barrier.meta.police.position.y);
            this.police = node;
            content.addChild(node);
            resolve("");
          }
        });
      });

      await new Promise((resolve, reject) => {
        resources.load("prefabs/小偷", Prefab, (err, prefab) => {
          if (err) {
            reject(err);
          } else {
            const node = instantiate(prefab);
            node.name = barrier.meta.thief.name;
            node
              .getComponent(UITransform)
              .setContentSize(new Size(barrier.meta.thief.contentW, barrier.meta.thief.contentH));
            node.setPosition(barrier.meta.thief.position.x, barrier.meta.thief.position.y);
            this.thief = node;
            content.addChild(node);
            resolve("");
          }
        });
      });

      this.lands.forEach(ele => {
        const land = ele.node.getComponent(LandScript);
        const line = barrier.meta.land.eles[ele.index];

        land.topLine = find(`Canvas/Content/${line.node.top}`)?.getComponent(LineScript);
        land.bottomLine = find(`Canvas/Content/${line.node.bottom}`)?.getComponent(LineScript);
        land.leftLine = find(`Canvas/Content/${line.node.left}`)?.getComponent(LineScript);
        land.rightLine = find(`Canvas/Content/${line.node.right}`)?.getComponent(LineScript);
      });

      this.lines.forEach(ele => {
        const line = ele.node.getComponent(LineScript);
        const land = barrier.meta.line.eles[ele.index];

        line.leftLand = find(`Canvas/Content/${land.node.left}`)?.getComponent(LandScript);
        line.rightLand = find(`Canvas/Content/${land.node.right}`)?.getComponent(LandScript);
      });

      this.thief.getComponent(ThiefScript).currLand = find(
        `Canvas/Content/${barrier.meta.thief.landName}`
      ).getComponent(LandScript);

      this.police.getComponent(PoliceScript).currLand = find(
        `Canvas/Content/${barrier.meta.police.landName}`
      ).getComponent(LandScript);
    } catch (error) {}
  }

  start() {
    const barrier = this.initGameData();
    this.initPrefabs(barrier);
  }

  update(deltaTime: number) {}
}
