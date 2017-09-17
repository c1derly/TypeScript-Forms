using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSF.CSharp.Data
{

    /// <summary>
    /// Contains data related to a remote call including criteria, which columns to pull back, sort order and server side paging options.
    /// </summary>
    public class Query
    {
        /// <summary>
        /// columns to retreive
        /// </summary>
        public List<string> columns = new List<string>();
        /// <summary>
        /// Conditions to apply to the query
        /// </summary>
        public Condition condition;
        /// <summary>
        /// for server side paging the record to start from
        /// </summary>
        public int startRecord;
        /// <summary>
        /// the number of records to return
        /// </summary>
        public int returnCount;
        /// <summary>
        /// the columns to sort by
        /// </summary>
        public List<SortElement> sortBy;

    }

}
