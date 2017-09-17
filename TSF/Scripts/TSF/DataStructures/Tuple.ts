namespace TSF.DS {
    /**
     *  Used to interface with the .Net tuple
     */
    export class Tuple {
        Item1: any;
        Item2: any;
        Item3: any;
        Item4: any;
        Item5: any;
        Item6: any;
        Item7: any;
        constructor(Item1: any, Item2?: any, Item3?: any, Item4?: any, Item5?: any, Item6?: any, Item7?: any) {
            this.Item1 = Item1;
            this.Item2 = Item2;
            this.Item3 = Item3;
            this.Item4 = Item4;
            this.Item5 = Item5;
            this.Item6 = Item6;
            this.Item7 = Item7;
        }
    }
}