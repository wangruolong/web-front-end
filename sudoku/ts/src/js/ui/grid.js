//生成九宫格
const Sudoku = require("../core/sudoku")
const Checker = require("../core/checker")
class Grid {
    constructor(container){
        this._$container = container;
    }

    build(){
        // 生成解决方案
        // const generator = new Generator();
        // generator.generate();
        // const matrix = generator.matrix;
        const sudoku = new Sudoku();
        sudoku.make();
        // const matrix = sudoku.solutionMatrix;//完成的解决方案
        console.log("答案：",sudoku.solutionMatrix)
        const matrix = sudoku.puzzleMatrix;//挖空后的解决方案
        const rowGroupClasses = ["row_g_top","row_g_middle","row_g_bottom"];
        const colGroupClasses = ["col_g_left","col_g_center","col_g_right"];
        const $cells = matrix.map(rowValues => rowValues.map((cellValue,colIndex)=>{
            return $("<span>")
            .addClass(colGroupClasses[colIndex % 3])
            .addClass(cellValue ? "fixed" : "empty")//cellValue如果存在就表示有值，如果不存在就表示是被挖空的。
            .text(cellValue)
        }))
        const $divArray = $cells.map(($spanArray,rowIndex) =>{
            return $("<div />")
            .addClass("row")
            .addClass(rowGroupClasses[rowIndex % 3])
            .append($spanArray)
        })
        this._$container.append($divArray)
    }
    layout(){
        const width = $("span:first", this._$container).width();
        $("span", this._$container)
        .height(width)
        .css({
            "line-height":`${width}px`,
            "font-size": width <32 ?`${width/2}px`:""
        })
    }
    //检查用户解谜的结果，成功则进行提示，失败显示错误位置的标记
    check(){
        //从界面获取要检查的数据。
        const data = this._$container.children().map((rowIndex,div) =>{//这是jquery的map不是es6的map
            return $(div).children()
            .map((colIndex,span)=>parseInt($(span).text())||0);
        })
        .toArray()//对外层的转换
        .map($data => $data.toArray());//对内层的转换
        // console.log('获取页面数据',data)
        const checker = new Checker(data);
        if(checker.check()){
            return true;
        }
        //检查不成功，进行标记
        const marks = checker.matrixMarks;
        this._$container.children()
        .each((rowIndex,div)=>{
            $(div).children().each((colIndex,span)=>{
                const $span = $(span);
                if($span.is(".fixed") || marks[rowIndex][colIndex]){//如果是fixed或者标记true，则删除error
                    $span.removeClass("error")
                }else{//否则加入error
                    $span.addClass("error");
                }
            })
        })
    }

    // 重置当前迷盘到初始状态
    reset(){
        this._$container.find("span:not(.fixed)")
        .removeClass("error mark1 mark2")
        .addClass("empty")
        .text(0)
    }
    // 清理错误标记
    clear(){
        this._$container.find("span.error")
        .removeClass("error")
    }
    // 开始新的一局
    rebuild(){
        this._$container.empty();
        this.build();
        this.layout();
    }
    bindPopup(popupNumbers){
        this._$container.on("click","span",e=>{
            const $cell = $(e.target);
            if($cell.is(".fixed")){//如果是fixed不让用户点击
                return;
            }
            popupNumbers.popup($cell);
        })
    }
}
module.exports = Grid;
