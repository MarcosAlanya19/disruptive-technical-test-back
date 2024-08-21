"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const errorHandler_1 = require("./middlewares/errorHandler");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const content_routes_1 = __importDefault(require("./routes/content.routes"));
const seed_routes_1 = __importDefault(require("./routes/seed.routes"));
const theme_routes_1 = __importDefault(require("./routes/theme.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
class Application {
    constructor() {
        this.app = (0, express_1.default)();
        this.middleware();
        this.routes();
        this.errorHandling(); // Asegurarse de manejar errores al final
    }
    middleware() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: (0, config_1.config)().cors.CORS_ORIGIN,
        }));
    }
    routes() {
        this.app.use('/api', seed_routes_1.default);
        this.app.use('/api', auth_routes_1.default);
        this.app.use('/api', category_routes_1.default);
        this.app.use('/api', theme_routes_1.default);
        this.app.use('/api', content_routes_1.default);
        this.app.use('/api', user_routes_1.default);
    }
    errorHandling() {
        this.app.use(errorHandler_1.errorHandler); // Manejo de errores debe ser el último middleware
        this.app.use((req, res, next) => {
            res.status(404).json({ message: 'Route not found' });
        });
    }
    start() {
        const port = (0, config_1.config)().port;
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
exports.app = new Application();
