import Table from "./src/Table.vue";

/* istanbul ignore next */
Table.install = function (app) {
  app.component(Table.name, Table);
};

export default Table;
