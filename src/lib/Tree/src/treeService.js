export default class treeService {
  constructor(options) {
    // 最多展示的层级
    this.renderIndex = 1;
    // 自定义节点唯一标识
    this.nodeKey = "id";
    // 自定义节点名称
    this.label = "name";
    // 自定义子节点名称
    this.children = "children";
    // 过滤方法
    this.filterNodeMethod = options.filterNodeMethod;
    // 原始列表数据
    this.originList = options.list;
    // 最终展示数据
    this.list = [];
    // init配置数据
    this.options = options;
  }

  init() {
    const options = this.options;
    for (let i in options.props) {
      if (!options.props[i]) {
        return;
      }
      this[i] = options.props[i];
    }

    this.list = this.initList(options.list);
  }

  initList(list, level) {
    list.forEach((item) => {
      const nextlevel = level ? level + 1 : 1;
      // 初始化层级、label、child
      item.level = nextlevel;
      item.id = item[this.nodeKey];
      item.name = item[this.label];
      item.children = item[this.children];

      if (item.children && item.children.length) {
        this.initList(item.children, nextlevel);
      } else {
        // 如果渲染层级是初始值，设置默认最大渲染层级为最后一级
        if (this.renderIndex === 1) {
          this.renderIndex = nextlevel;
        }
      }
    });
    return list;
  }

  setData(key, data) {
    if (!data) {
      return;
    }
    if (key === "list") {
      this.originList = data;
      data = this.initList(data);
    }

    this[key] = data;
  }

  setListData(id, list = this.list) {
    for (let i in list) {
      if (list[i].id === id) {
        list[i].isActive = true;
        return;
      }

      if (list[i].children && list[i].children.length) {
        this.setListData(id, list.children);
      }
    }
    return list;
  }

  filter(key) {
    if (!key) {
      this.list = this.originList;
    }
    if (this.filterNodeMethod && key) {
      this.list = this.originList.filter((item) => {
        return this.filterNodeMethod(key, item);
      });
    }
    return this.initList(this.list);
  }
}
