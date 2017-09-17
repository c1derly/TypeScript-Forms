
namespace TSF.Data.Interfaces {
    export interface ISortable {
        onSortChanged: Events.ValueEvent<Array<Data.SortElement>>;
        applySorting(sortBy: Array<Data.SortElement>,refresh?:boolean);
    }
}