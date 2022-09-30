interface common {
  s?: any;
}
interface SwitchAction extends common {
  type: "switch";
  switchKeys: string[];
}
interface ChangeAction extends common {
  type: "change";
  newSetting: Record<string, any>;
}
type CommandAction = SwitchAction | ChangeAction;
const switchA: CommandAction = {
  type: "switch",
  switchKeys: ["a", "b"],
};
const changeA: CommandAction = {
  type: "change",
  newSetting: {
    key: "value",
  },
};

const a: CommandAction = {
  type: "switch",
  switchKeys: [],
};
