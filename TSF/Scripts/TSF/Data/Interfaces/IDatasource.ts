
namespace TSF.Data.Interfaces {
    export interface IDataSource extends IFilterable, ISortable, IPageable{
        refresh();
        data;
        onDataUpdated: Events.ValueEvent<any>;
    }
}