"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("./ui/grid");
const popupnumbers_1 = require("./ui/popupnumbers");
const grid = new grid_1.default($("#container"));
grid.build();
grid.layout();
const popupNumbers = new popupnumbers_1.default($("#popupNumbers"));
grid.bindPopup(popupNumbers);
$("#check").on("click", e => {
    if (grid.check()) {
        alert("恭喜！解谜成功！");
    }
});
$("#reset").on("click", e => {
    grid.reset();
});
$("#clear").on("click", e => {
    grid.clear();
});
$("#rebuild").on("click", e => {
    grid.rebuild();
});
