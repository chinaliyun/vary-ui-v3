import Table from "./src/Table";

/* istanbul ignore next */
Table.install = function (app) {
  app.component(Table.name, Table);
};

export default Table;
