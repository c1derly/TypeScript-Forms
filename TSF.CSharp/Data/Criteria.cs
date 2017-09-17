using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSF.CSharp.Data
{
    /// <summary>
    /// How to join criteria or criteria groups
    /// </summary>
    public enum CriteriaJoin
    {
        And, Or
    }
    /// <summary>
    /// The type of comparison to do
    /// </summary>
    public enum CriteriaComparator
    {
        Equal,
        NotEqual,
        GreaterThan,
        LessThan,
        GreaterThanOrEqual,
        LessThanOrEqual,
        Like,
        NotLike,
        In,
        NotIn,
        IsNull,
        IsNotNull
    }
    /// <summary>
    /// A class that represents an sql criteria
    /// </summary>
    public class Criteria
    {
        /// <summary>
        /// how to join it with the previous criteria (And,Or)
        /// </summary>
        public CriteriaJoin join ;
        /// <summary>
        /// the name of the column you want to create a criteria for
        /// </summary>
        public string column ;
        /// <summary>
        /// the value to compare the column to
        /// </summary>
        public Object value ;
        /// <summary>
        /// the type of comparison to be done
        /// </summary>
        public CriteriaComparator comparator ;
        /// <summary>
        /// Creates a new criteria with the specified constraint
        /// </summary>
        /// <param name="column">the column to the compare the value to</param>
        /// <param name="value">the value to compare against the column</param>
        /// <param name="comparator">the type of comparison to do (Equals, Greater than etc)</param>
        /// <param name="join">how to join the criteria to the previous criteria</param>
        public Criteria(string column, Object value, CriteriaComparator comparator = CriteriaComparator.Equal, CriteriaJoin join = CriteriaJoin.And)
        {
            this.column = column;
            this.value = value;
            this.join = join;
            this.comparator = comparator;
        }
    }
}
