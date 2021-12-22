"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get('/*', (req, res) => {
    res.json({
        "message": 'ok'
    });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Server started at port ' + PORT));
