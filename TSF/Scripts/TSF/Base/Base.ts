/// <reference path="..\Events\EmptyEvent.ts" />
/// <reference path="..\Remote\Remote.ts" />
namespace TSF.Base {
    /**
     * Base functionality for TSF that constructs the elements based on the html attributes.
     */
    export class TSBase {
        static onInit = new Events.EmptyEvent();
        static defaultTypes = undefined
        /**
         * Goes through the HTML and constructs the controls marked in the html
         * @param element
         */
        public static constructControls(element: HTMLElement) {
            if (TSBase.defaultTypes === undefined)
                TSBase.defaultTypes = {
                    BUTTON: TSF.UI.Button, INPUT: { CHECKBOX: TSF.UI.Checkbox, TEXT: TSF.UI.TextBox, SUBMIT: TSF.UI.Button, BUTTON: TSF.UI.Button, RADIO: TSF.UI.RadioButton }, IMG: TSF.UI.Image, TABLE: TSF.UI.Grid.WunderGrid, SELECT: { '': TSF.UI.DropDown, MULTIPLE: TSF.UI.MultiSelect }
                };
            var elements = new Array<any>();
            elements.push({ ele: element, name: "" });
            var curName = "";
            while (elements.length > 0) {
                var link = elements.pop();
                var node = link.ele;
                curName = link.name;
                var tsClass = node.getAttribute('TSClass');
                var name: string = node.getAttribute('var');
                let parent = link.logicalParent;
                if (tsClass !== null && tsClass !== undefined) {
                    if (name !== undefined && name.length > 0) {
                        let res = TSBase.getRelativeObjects.apply(this, [name, parent]);
                        let clss = eval(tsClass);
                        let ctrl: UI.LogicalControl = new clss(node, res.parent);
                        if (!res.parent)
                            window[res.att] = ctrl;
                        else
                            res.parent[res.att] = ctrl;
                        parent = ctrl;
                    }
                    else {
                        let ctrl = eval('new ' + tsClass + '(node)');
                        parent = ctrl;
                    }
                }
                else if (name !== null && name !== undefined) {
                    let res = TSBase.getRelativeObjects.apply(this, [name, parent]);
                    var type = (<string>node.nodeName).toUpperCase();
                    var def = TSBase.defaultTypes[type];
                    if (type == "INPUT")
                    {
                        type = node.getAttribute('type');
                        if (type !== undefined && type !== null)
                            type = type.toUpperCase();
                        def = def[type];
                    }
                    else if (type == "SELECT")
                    {
                        if (node.hasAttribute('MULTIPLE'))
                            def = def['MULTIPLE'];
                        else
                            def = def[''];
                    }
                    let ctrl: UI.LogicalControl
                    if (def !== undefined && def !== null)
                        ctrl = new def(node, res.parent);
                        else
                        ctrl = new TSF.UI.TSControl(node,res.parent);
                    if (!res.parent)
                        window[res.att] = ctrl;
                    else
                        res.parent[res.att] = ctrl;
                    parent = ctrl;
                }
                var len = node.children.length;
                for (let i = 0; i < len; i++) {
                    elements.push({ ele: node.children[len - i - 1], logicalParent: parent});
                }
            }
            
        }

         /**
         * Not intended for use outside of framework.  Used to handle relative paths in the var element of
         * html elements.  
         * @param path - path to assign this control to.
         */
        public static getRelativeObjects(path: string, parentNode: UI.LogicalControl) {
            var pth = path.trim();
            var splitPath = pth.split(/[\.]/g);
            var len = splitPath.length;
            len = len - 1;
            if (pth[0] !== '.') {
                var att = splitPath.pop();
                var par = eval(splitPath.join('.'));
                return { parent: par, att: att };
            }
            let currentNode: UI.LogicalControl;
            if (splitPath[0] == '')
                currentNode = parentNode;
            for (var i = 1; i < len; i++){
                if (!currentNode || splitPath[i] !== '')
                    break;
                currentNode = currentNode.logicalParent;
            }
            if (currentNode) {
                var temp = splitPath.slice(i, splitPath.length);
                var att = temp.pop();
                let par;
                if (temp.length == 0)
                    par = currentNode;
                else
                    par = currentNode[temp.join('.')];
                return { parent: par, att: att };
            }
        }
    }
    
    $(function () {
        TSBase.constructControls.apply(window, [document.documentElement]);
        TSBase.onInit.fire();
    });

    
} 