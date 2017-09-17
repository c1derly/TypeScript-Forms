/// <reference path="..\TSControl.ts" />
namespace TSF.UI.Grid {
    export interface IGenerateColumn {
        generateHeader(column: WunderColumn, grid: WunderGrid): WunderColumnHeader;
    }
}