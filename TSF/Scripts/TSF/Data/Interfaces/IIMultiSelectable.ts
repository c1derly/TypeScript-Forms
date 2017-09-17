namespace TSF.Data.Interfaces {

    export interface IMultiSelectable  {
        OnSelectionChanged: Events.GenericEvent<UI.TSControl, Array<UI.TSControl>>;
        SelectedValues: Array<any>;
    }
}