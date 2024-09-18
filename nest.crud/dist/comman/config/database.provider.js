"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../api/users/user.entity/user.entity");
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'test',
                entities: [user_entity_1.UserEntity],
                synchronize: true,
            });
            try {
                await dataSource.initialize();
                console.log('Database connection established successfully');
            }
            catch (error) {
                console.error('Database connection failed:', error);
            }
            return dataSource;
        },
    },
];
//# sourceMappingURL=database.provider.js.map