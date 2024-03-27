namespace TSF.UI.Grid.Extensions {
    import Grid = TSF.UI.Grid;
    import UI = TSF.UI;
    export class ButtonCell extends Extensions.BaseEditableCell implements Grid.IGenerateCell {

        buttonClass: string;
        public buttonText: string;
        public onClickEvent: TSF.Events.UIEvent = new TSF.Events.UIEvent();

        constructor(buttonText, buttonClass = "") {
            super();
            this.buttonClass = buttonClass;
            this.buttonText = buttonText;

        }


        generateCell(value: any, column: Grid.WunderColumn, row: Grid.WunderRow, grid: Grid.WunderGrid): Grid.WunderCell {
            var cell = new Grid.WunderCell();

            var counter = 0;

            var button = new UI.Button();
            button.Type = UI.ButtonType.button;
            button.Text = this.buttonText;



            button.Class = this.buttonClass;
            button.OnClick.add((sender, args) => this.onClickEvent.fire(sender, row), this);
            cell.Append(button);


            return cell;
        }
    }
}