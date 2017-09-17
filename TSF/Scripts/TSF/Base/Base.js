/// <reference path="..\Events\EmptyEvent.ts" />
/// <reference path="..\Remote\Remote.ts" />
var TSF;
(function (TSF) {
    var Base;
    (function (Base) {
        /**
         * Base functionality for TSF that constructs the elements based on the html attributes.
         */
        var TSBase = (function () {
            function TSBase() {
            }
            /**
             * Goes through the HTML and constructs the controls marked in the html
             * @param element
             */
            TSBase.constructControls = function (element) {
                var elements = new Array();
                elements.push({ ele: element, name: "" });
                var curName = "";
                while (elements.length > 0) {
                    var link = elements.pop();
                    var node = link.ele;
                    curName = link.name;
                    var tsClass = node.getAttribute('TSClass');
                    var name = node.getAttribute('var');
                    var parent_1 = link.logicalParent;
                    if (tsClass !== null && tsClass !== undefined) {
                        if (name !== undefined && name.length > 0) {
                            var res = TSBase.getRelativeObjects.apply(this, [name, parent_1]);
                            var ctrl = eval('new ' + tsClass + '(node,res.parent)');
                            if (!res.parent)
                                window[res.att] = ctrl;
                            else
                                res.parent[res.att] = ctrl;
                            parent_1 = ctrl;
                        }
                        else {
                            var ctrl = eval('new ' + tsClass + '(node)');
                            parent_1 = ctrl;
                        }
                    }
                    else if (name !== null && name !== undefined) {
                        var res = TSBase.getRelativeObjects.apply(this, [name, parent_1]);
                        var ctrl = eval('new TSF.UI.TSControl(node,res.parent)');
                        if (!res.parent)
                            window[res.att] = ctrl;
                        else
                            res.parent[res.att] = ctrl;
                        parent_1 = ctrl;
                    }
                    var len = node.children.length;
                    for (var i = 0; i < len; i++) {
                        elements.push({ ele: node.children[len - i - 1], logicalParent: parent_1 });
                    }
                }
            };
            /**
            * Not intended for use outside of framework.  Used to handle relative paths in the var element of
            * html elements.
            * @param path - path to assign this control to.
            */
            TSBase.getRelativeObjects = function (path, parentNode) {
                var pth = path.trim();
                var splitPath = pth.split(/[\.]/g);
                var len = splitPath.length;
                len = len - 1;
                if (pth[0] !== '.') {
                    var att = splitPath.pop();
                    var par = eval(splitPath.join('.'));
                    return { parent: par, att: att };
                }
                var currentNode;
                if (splitPath[0] == '')
                    currentNode = parentNode;
                for (var i = 1; i < len; i++) {
                    if (!currentNode || splitPath[i] !== '')
                        break;
                    currentNode = currentNode.logicalParent;
                }
                if (currentNode) {
                    var temp = splitPath.slice(i, splitPath.length);
                    var att = temp.pop();
                    var par_1;
                    if (temp.length == 0)
                        par_1 = currentNode;
                    else
                        par_1 = currentNode[temp.join('.')];
                    return { parent: par_1, att: att };
                }
            };
            return TSBase;
        }());
        TSBase.onInit = new TSF.Events.EmptyEvent();
        Base.TSBase = TSBase;
        $(function () {
            TSBase.constructControls.apply(window, [document.documentElement]);
            TSBase.onInit.fire();
        });
    })(Base = TSF.Base || (TSF.Base = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Base.js.map