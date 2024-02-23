namespace TSF.Data {
    export class Filtering {
        protected static OperationsHash;
        protected static regexHash;
        public static filterOnCondition(data: Array<any>, filters: Data.Condition, columnHash: Hash<UI.Column>): Array<any> {

            if (!Filtering.OperationsHash) {
                Filtering.OperationsHash = {};
                Filtering.OperationsHash[Data.CriteriaComparator.Equal] = (val1, val2) => val1 === val2
                Filtering.OperationsHash[Data.CriteriaComparator.NotEqual] = (val1, val2) => val1 !== val2;
                Filtering.OperationsHash[Data.CriteriaComparator.GreaterThan] = (val1, val2) => val1 > val2;
                Filtering.OperationsHash[Data.CriteriaComparator.GreaterThanOrEqual] = (val1, val2) => val1 >= val2;
                Filtering.OperationsHash[Data.CriteriaComparator.IsNotNull] = (val1, val2) => val1 !== null;
                Filtering.OperationsHash[Data.CriteriaComparator.IsNull] = (val1, val2) => val1 === null;
                Filtering.OperationsHash[Data.CriteriaComparator.LessThan] = (val1, val2) => val1 < val2;
                Filtering.OperationsHash[Data.CriteriaComparator.LessThanOrEqual] = (val1, val2) => val1 <= val2;

                Filtering.OperationsHash[Data.CriteriaComparator.Like] = (val1: string, val2: string) => {
                    var regex: RegExp = Filtering.regexHash[val2];
                    if (!regex)
                        Filtering.regexHash[val2] = regex = new RegExp('^' + val2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*?') + '$');
                    return regex.test(val1);
                };

                Filtering.OperationsHash[Data.CriteriaComparator.NotLike] = (val1: string, val2: string) => {
                    var regex: RegExp = Filtering.regexHash[val2];
                    if (!regex)
                        Filtering.regexHash[val2] = regex = new RegExp('^' + val2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*?') + '$');
                    return !regex.test(val1);
                };
                Filtering.OperationsHash[Data.CriteriaComparator.In] = (val1: Object, val2: Array<any>) => {
                    var len = val2.length;
                    for (let i = 0; i < len; i++) {
                        if (val1 === val2[i])
                            return true;
                    }
                    return false;
                }
                Filtering.OperationsHash[Data.CriteriaComparator.NotIn] = (val1: Object, val2: Array<any>) => {
                    var len = val2.length;
                    for (let i = 0; i < len; i++) {
                        if (val1 === val2[i])
                            return false;
                    }
                    return true;
                };
            }


            Filtering.convertDateTimesForCriteria(filters.criteria, columnHash);
            Filtering.convertDateTimesForCriteriaGroup(filters.criteriaGroup, columnHash);
            return Filtering.filterLocalData(data, filters, columnHash);
        }
        protected static convertDateTimesForCriteriaGroup(groups: Array<Data.CriteriaGroup>, columnHash: Hash<UI.Column>) {
            let len = groups.length;
            for (let i = 0; i < len; i++) {
                let group = groups[i];
                Filtering.convertDateTimesForCriteria(group.criteria, columnHash);
                Filtering.convertDateTimesForCriteriaGroup(group.groups, columnHash);
            }
        }
        protected static convertDateTimesForCriteria(criteria: Array<Data.Criteria>, columnHash : Hash<UI.Column>) {
            let len = criteria.length;
            for (let i = 0; i < len; i++) {
                let crit = criteria[i];
                let col = columnHash[crit.column];
                if (col && col.dataType === UI.ColumnType.DateTime) {
                    crit['#dt'] = new Date(<any>crit.value).getTime();
                }
            }

        }
        /**
         * Filters data locally on teh provided condition
         * @param condition - condition to filter data on
         */
        protected static filterLocalData(data: Array<any>, condition: Data.Condition, columnHash: Hash<UI.Column>) {
            var dataLen = data.length;
            var newData = [];

            for (let i = 0; i < dataLen; i++) {
                let dat = data[i];
                let validated = Filtering.checkCriteriaList(condition.criteria, dat, columnHash);
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

        }
        /**
         * Checks to see if an object matches the criteria in a criteria group list
         * @param groups - list of criteria groups to compare the data against
         * @param data - data to compare
         */
        protected static checkCriteriaGroup(groups: Array<Data.CriteriaGroup>, data: any, columnHash: Hash<UI.Column>): boolean {
            let dataCondition = true;

            let groupLen = groups.length;

            if (groupLen > 0) {
                let group = groups[0];
                if (group.groups.length > 0) {
                    if (group.groups[0].join === Data.CriteriaJoin.And)
                        dataCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) && Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                    else
                        dataCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) || Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                }
                else
                    dataCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash)
            }
            for (let i = 1; i < groupLen; i++) {
                let tempCondition = false;
                let group = groups[i];
                if (group.groups.length > 0) {
                    if (group.groups[0].join === Data.CriteriaJoin.And)
                        tempCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) && Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                    else
                        tempCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash) || Filtering.checkCriteriaGroup(group.groups, data, columnHash);
                }
                else
                    tempCondition = Filtering.checkCriteriaList(group.criteria, data, columnHash)
                if (group.join == Data.CriteriaJoin.And)
                    dataCondition = dataCondition && tempCondition;
                else
                    dataCondition = dataCondition || tempCondition;

            }
            return dataCondition;
        }
        /**
         * Determines if an object matches the specified criteria
         * @param criteria - list of criteria to compare
         * @param data - data to compare criteria against
         */
        protected static checkCriteriaList(criteria: Array<Data.Criteria>, data: any, columnHash: Hash<UI.Column>): boolean {
            let dataCondition = true;
            let criteriaLength = criteria.length;
            let opHash = Filtering.OperationsHash;
            if (criteriaLength > 0) {
                let crit = criteria[0];
                let col: UI.Column = columnHash[crit.column];
                let val1 = data[crit.column];
                let val2;
                if (col && col.dataType === UI.ColumnType.DateTime) {
                    val2 = crit['#dt'];
                    val1 = new Date(val1).getTime();
                }
                else
                    val2 = crit.value;

                dataCondition = opHash[crit.comparator](val1, val2);
            }



            for (let i = 1; i < criteriaLength; i++) {
                let crit = criteria[i];
                let col: UI.Column = columnHash[crit.column];
                var val1 = data[crit.column];
                var val2 = crit.value;
                if (col.dataType === UI.ColumnType.DateTime) {
                    val2 = new Date(<any>val2).getTime();
                    val1 = new Date(val1).getTime();
                }

                if (crit.join == Data.CriteriaJoin.And)
                    dataCondition = dataCondition && opHash[crit.comparator](val1, val2);
                else
                    dataCondition = dataCondition || opHash[crit.comparator](val1, val2);
            }
            return dataCondition;
        }
    }
}