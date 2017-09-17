namespace TSF.Data.Interfaces {
    export interface IBindableArray extends IBindable {
        bind(data: Array<any>)
    }
}