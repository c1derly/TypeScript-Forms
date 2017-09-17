
namespace TSF.Data.Interfaces {
    export interface IFilterable {
        applyFilter(criteria: Condition | Array<string> | string, refresh?: boolean);
    }
}