"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversionController_1 = require("../controllers/conversionController");
const router = (0, express_1.Router)();
router.post('/convert', conversionController_1.convertText);
router.get('/health', conversionController_1.healthCheck);
exports.default = router;
