var TSF;
(function (TSF) {
    var Data;
    (function (Data) {
        var Filtering = (function () {
            function Filtering() {
            }
            Filtering.filterOnCondition = function (data, filters, columnHash) {
                if (!Filtering.OperationsHash) {
                    Filtering.OperationsHash = {};
                    Filtering.OperationsHash[Data.CriteriaComparator.Equal] = function (val1, val2) { return val1 === val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.NotEqual] = function (val1, val2) { return val1 !== val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.GreaterThan] = function (val1, val2) { return val1 > val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.GreaterThanOrEqual] = function (val1, val2) { return val1 >= val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.IsNotNull] = function (val1, val2) { return val1 !== null; };
                    Filtering.OperationsHash[Data.CriteriaComparator.IsNull] = function (val1, val2) { return val1 === null; };
                    Filtering.OperationsHash[Data.CriteriaComparator.LessThan] = function (val1, val2) { return val1 < val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.LessThanOrEqual] = function (val1, val2) { return val1 <= val2; };
                    Filtering.OperationsHash[Data.CriteriaComparator.Like] = function (val1, val2) {
                        var regex = Filtering.regexHash[val2];
                        if (!regex)
                            Filtering.regexHash[val2] = regex = new RegExp('^' + val2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*?') + '$');
                        return regex.test(val1);
                    };
                    Filtering.OperationsHash[Data.CriteriaComparator.NotLike] = function (val1, val2) {
                        var regex = Filtering.regexHash[val2];
                        if (!regex)
                            Filtering.regexHash[val2] = regex = new RegExp('^' + val2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*?') + '$');
                        return !regex.test(val1);
                    };
                    Filtering.OperationsHash[Data.CriteriaComparator.In] = function (val1, val2) {
                        var len = val2.length;
                        for (var i = 0; i < len; i++) {
                            if (val1 === val2[i])
                                return true;
                        }
                        return false;
                    };
                    Filtering.OperationsHash[Data.CriteriaComparator.NotIn] = function (val1, val2) {
                        var len = val2.length;
                        for (var i = 0; i < len; i++) {
                            if (val1 === val2[i])
                                return false;
                        }
                        return true;
                    };
                }
                Filtering.convertDateTimesForCriteria(filters.criteria, columnHash);
                Filtering.convertDateTimesForCriteriaGroup(filters.criteriaGroup, columnHash);
                return Filtering.filterLocalData(data, filters, columnHash);
            };
            Filtering.convertDateTimesForCriteriaGroup = function (groups, columnHash) {
                var len = groups.length;
                for (var i = 0; i < len; i++) {
                    var group = groups[i];
                    Filtering.convertDateTimesForCriteria(group.criteria, columnHash);
                    Filtering.convertDateTimesForCriteriaGroup(group.groups, columnHash);
                }
            };
            Filtering.convertDateTimesForCriteria = function (criteria, columnHash) {
                var len = criteria.length;
                for (var i = 0; i < len; i++) {
                    var crit = criteria[i];
                    var col = columnHash[crit.column];
                    if (col && col.dataType === TSF.UI.ColumnType.DateTime) {
                        crit['#dt'] = new Date(crit.value).getTime();
                    }
                }
            };
            /**
             * Filters data locally on teh provided condition
             * @param condition - condition to filter data on
             */
            Filtering.filterLocalData = function (data, condition, columnHash) {
                var dataLen = data.length;
                var newData = [];
                for (var i = 0; i < dataLen; i++) {
                    var dat = data[i];
                    var validated = Filtering.checkCriteriaList(condition.criteria, dat, columnHash);
                    if (condition.criteriaGroup.length > 0) {
                        if (condition.criteriaGroup[0].join === Data.CriteriaJoin.And)
                            validated = validated && Filtering.checkCriteriaGroup(condition.criteriaGroup, dat, columnHash);
                        else
                            validated = validated || Filtering.checkCriteriaGroup(condition.criteriaGroup, dat, columnHash);
                    }
                    if (validated)
                        newData.push(dat);
                }
                return newData;
            };
            /**
             * Checks to see if an object matches the criteria in a criteria group list
             * @param groups - list of criteria groups to compare the data against
             * @param data - data to compare
             */
            Filtering.checkCriteriaGroup = function (groups, data, columnHash) {
                var dataCondition = true;
                var groupLen = groups.length;
                if (groupLen > 0) {
                    var group = groups[0];
                    if (group.groups.length > 0) {
                        if (group.groups[0].join === Data.CriteriaJoin.And)
                            dataCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) && Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                        else
                            dataCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) || Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                    }
                    else
                        dataCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash);
                }
                for (var i = 1; i < groupLen; i++) {
                    var tempCondition = false;
                    var group = groups[i];
                    if (group.groups.length > 0) {
                        if (group.groups[0].join === Data.CriteriaJoin.And)
                            tempCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) && Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                        else
                            tempCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) || Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                    }
                    else
                        tempCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash);
                    if (group.join == Data.CriteriaJoin.And)
                        dataCondition = dataCondition && tempCondition;
                    else
                        dataCondition = dataCondition || tempCondition;
                }
                return dataCondition;
            };
            /**
             * Determines if an object matches the specified criteria
             * @param criteria - list of criteria to compare
             * @param data - data to compare criteria against
             */
            Filtering.checkCriteriaList = function (criteria, data, columnHash) {
                var dataCondition = true;
                var criteriaLength = criteria.length;
                var opHash = Filtering.OperationsHash;
                if (criteriaLength > 0) {
                    var crit = criteria[0];
                    var col = columnHash[crit.column];
                    var val1_1 = data[crit.column];
                    var val2_1;
                    if (col && col.dataType === TSF.UI.ColumnType.DateTime) {
                        val2_1 = crit['#dt'];
                        val1_1 = new Date(val1_1).getTime();
                    }
                    else
                        val2_1 = crit.value;
                    dataCondition = opHash[crit.comparator](val1_1, val2_1);
                }
                for (var i = 1; i < criteriaLength; i++) {
                    var crit = criteria[i];
                    var col = columnHash[crit.column];
                    var val1 = data[crit.column];
                    var val2 = crit.value;
                    if (col.dataType === TSF.UI.ColumnType.DateTime) {
                        val2 = new Date(val2).getTime();
                        val1 = new Date(val1).getTime();
                    }
                    if (crit.join == Data.CriteriaJoin.And)
                        dataCondition = dataCondition && opHash[crit.comparator](val1, val2);
                    else
                        dataCondition = dataCondition || opHash[crit.comparator](val1, val2);
                }
                return dataCondition;
            };
            return Filtering;
        }());
        Data.Filtering = Filtering;
    })(Data = TSF.Data || (TSF.Data = {}));
})(TSF || (TSF = {}));
//# sourceMappingURL=Filtering.js.map