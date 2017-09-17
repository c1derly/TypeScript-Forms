/// <reference path="..\TSControl.ts" />
namespace TSF.UI.Grid {
    export interface IGenerateCell {
        generateCell(value: any, column: WunderColumn, row: WunderRow, grid: WunderGrid): WunderCell;
    }
}