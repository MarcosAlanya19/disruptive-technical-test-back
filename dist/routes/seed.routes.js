"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seed_controller_1 = require("../controllers/seed.controller");
const router = (0, express_1.Router)();
router.get('/seed', seed_controller_1.seedController.initSeed);
exports.default = router;
