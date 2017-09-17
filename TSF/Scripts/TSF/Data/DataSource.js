var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/// <reference path="..\UI\LogicalControl.ts" />
/// <reference path=".\Criteria.ts" />
var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        /**An asynchronous datasource.s**/
        var DataSource = (function (_super) {
            __extends(DataSource, _super);
            function DataSource(ele, logicalParent) {
                var _this = _super.call(this, ele, logicalParent) || this;
                /**the current page number  not to be set directly.**/
                _this.pageNum = 0;
                /**Event is fired when the data is successfully updated**/
                _this.onDataUpdated = new TSF.Events.ValueEvent();
                _this.onError = new TSF.Events.ValueEvent();
                /**Is fired when the page changed in the datasource (used by pagers in case something resets the data source and also provides max pages to display)**/
                _this.onPageChange = new Data.PageChangeEvent();
                _this.onSortChanged = new TSF.Events.ValueEvent();
                _this.loadConfiguration('dataUrl', 'countUrl', 'pageSize', 'clientPaging', 'fireStartEndEvents');
                _this.convertToInteger('pageSize', 0);
                _this.convertToBoolean('clientPaging', false);
                _this.convertToBoolean('fireStartEndEvents', false);
                return _this;
            }
            Object.defineProperty(DataSource.prototype, "Criteria", {
                /** criteria currently set on data source */
                get: function () {
                    return this.criteria;
                },
                enumerable: true,
                configurable: true
            });
            /**Calls the data retrieval method.**/
            DataSource.prototype.callDataMethod = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var startIndex, recordCount, query, _a, e_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (this.pageSize === undefined)
                                    this.pageSize = this.maxRecords;
                                startIndex = this.pageNum * this.pageSize;
                                if (this.maxRecords < startIndex + this.pageSize)
                                    recordCount = this.maxRecords - startIndex;
                                else
                                    recordCount = this.pageSize;
                                query = new Data.Query();
                                query.condition = this.criteria;
                                query.startRecord = startIndex;
                                query.returnCount = recordCount;
                                if (this.sortBy && this.sortBy.length > 0)
                                    query.sortBy = this.sortBy;
                                else
                                    query.sortBy = this.defaultSortBy;
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                _a = this;
                                return [4 /*yield*/, new TSF.Remote.RemoteCall(this.dataUrl, query).advancedOptions(TSF.Remote.RequestType.POST, this.fireStartEndEvents).call()];
                            case 2:
                                _a.data = (_b.sent());
                                this.updateDS(this.data);
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _b.sent();
                                console.error(e_1);
                                this.onError.fire(e_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            };
            /* fire the updated data source method and determines the max pages etc */
            DataSource.prototype.updateDS = function (ds) {
                this.onDataUpdated.fire(ds);
                this.onDSRefresh();
            };
            DataSource.prototype.onDSRefresh = function () {
                var maxPages = 0;
                if (this.maxRecords != undefined
                    && this.pageSize !== undefined) {
                    maxPages = Math.ceil(this.maxRecords / this.pageSize);
                }
                this.onPageChange.fire(this.pageNum + 1, maxPages);
            };
            /**Refreshes the data in the datasource with the current page number and filters**/
            DataSource.prototype.refresh = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var query, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(this.countUrl !== undefined
                                    && this.countUrl !== null)) return [3 /*break*/, 2];
                                query = new Data.Query();
                                query.condition = this.criteria;
                                if (this.sortBy && this.sortBy.length > 0)
                                    query.sortBy = this.sortBy;
                                else
                                    query.sortBy = this.defaultSortBy;
                                _a = this;
                                return [4 /*yield*/, new TSF.Remote.RemoteCall(this.countUrl, query).advancedOptions(TSF.Remote.RequestType.POST, this.fireStartEndEvents).call()];
                            case 1:
                                _a.maxRecords = (_b.sent());
                                this.callDataMethod();
                                return [3 /*break*/, 3];
                            case 2:
                                this.callDataMethod();
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * Applies filters to the data source (resets page to 0);
             * @param filters - Filters to apply to the data source
             * @param refresh - determines if a data refresh should occur when the method is called.
             */
            DataSource.prototype.applyFilter = function (filters, refresh) {
                if (refresh === void 0) { refresh = true; }
                if (this.criteria != filters)
                    this.pageNum = 0;
                this.criteria = filters;
                if (refresh) {
                    this.refresh();
                }
            };
            /**
             * Changes the sort column being used for the datasource for the server side sorting
             * @param sortBy - Sort by fields to sort on
             * @param refresh - determines if a data refresh should occur when the method is called.
             */
            DataSource.prototype.applySorting = function (sortBy, refresh) {
                this.sortBy = sortBy;
                this.pageNum = 0;
                if (refresh === undefined || refresh === true)
                    this.refresh();
                this.onSortChanged.fire(this.sortBy);
            };
            /**
             * Changes the page number of the data source
             * @param pageNum - the page to change to.
             */
            DataSource.prototype.changePage = function (pageNum) {
                this.pageNum = pageNum - 1;
                this.refresh();
            };
            return DataSource;
        }(TSF.UI.LogicalControl));
        Data.DataSource = DataSource;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=DataSource.js.map