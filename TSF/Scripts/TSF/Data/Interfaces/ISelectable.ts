namespace TSF.Data.Interfaces {

    export interface ISelectable  {
        OnSelectionChanged: Events.GenericEvent<UI.TSControl, UI.TSControl>;
        SelectedValue: any;
    }
}