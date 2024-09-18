"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const table_entity_1 = require("./src/table.entity");
exports.ormConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'test',
    entities: [table_entity_1.Table],
    synchronize: true,
};
//# sourceMappingURL=orm.config.js.map