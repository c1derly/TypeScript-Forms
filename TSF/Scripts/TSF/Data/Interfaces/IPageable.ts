
namespace TSF.Data.Interfaces {
    export interface IPageable {
        changePage(pageNum: number);
        onPageChange: PageChangeEvent;
        pageSize: number;
    }
}