using System.Collections.Generic;

namespace TSF.CSharp.Data
{
    public class Condition
    {

        /// <summary>
        /// Used to hold a group of criteria that would be enclosed in a parathensis
        /// </summary>
        public List<CriteriaGroup> criteriaGroup;
        /// <summary>
        /// used to hold a list of criteria
        /// </summary>
        public List<Criteria> criteria;

        /// <summary>
        /// Creates a new condition with an optional starting criteria
        /// </summary>
        /// <param name="column">the column name to compare</param>
        /// <param name="value">the value to compare the parameter name against</param>
        /// <param name="comparator">the type of comparison to be done.</param>

        public Condition(string column, object value, CriteriaComparator comparator = CriteriaComparator.Equal)
        {
            if (column != null)
            {
                this.criteria.Add(new Criteria(column, value, comparator));
            }

        }
    }

}