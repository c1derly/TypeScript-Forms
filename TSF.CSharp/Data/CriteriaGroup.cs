using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSF.CSharp.Data
{
    public class CriteriaGroup
    {
        /// <summary>
        /// how to join the group onto the previous criteria or groups
        /// </summary>
        public CriteriaJoin join;
        /// <summary>
        /// the list of criteria for the group
        /// </summary>
        public List<Criteria> criteria;
        /// <summary>
        ///  sub groups of the groups
        /// </summary>
        public List<CriteriaGroup> groups;
        /// <summary>
        ///  how to join the group onto the previous criteria.
        /// </summary>
        /// <param name="join">The way to join the group onto the previous criteria or groups</param>
        public CriteriaGroup(CriteriaJoin join = CriteriaJoin.And)
        {
            this.join = join;
        }
    }
}
