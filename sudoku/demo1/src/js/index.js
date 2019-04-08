const Toolkit = require("./core/toolkit")
const Grid = require("./ui/grid")

const grid = new Grid($("#container"));
grid.build();
grid.layout();