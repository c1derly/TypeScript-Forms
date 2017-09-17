namespace TSF.Data.Interfaces {

    export interface IBindableWithKeys extends IBindable {
        ValueKey: string;
        TextKey: string;
    }
}