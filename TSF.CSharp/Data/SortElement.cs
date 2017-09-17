namespace TSF.CSharp.Data
{
    /// <summary>
    /// sort direction of a query
    /// </summary>
    public enum SortDirection
    {
        ASC, DESC
    }
    /// <summary>
    /// The sort element of a query.
    /// </summary>
    public class SortElement
    {
        /// <summary>
        /// the column to sort by
        /// </summary>
        public string column;
        /// <summary>
        /// the sort direction
        /// </summary>
        public SortDirection sortDirection;

        /// <summary>
        /// The sort element of a query.
        /// </summary>
        /// <param name="column">the column to sort by </param>
        /// <param name="sortDirection">the direction to sort by (optional.  Sorts by Ascending by default).</param>

        SortElement(string column, SortDirection sortDirection = SortDirection.ASC)
        {
            this.column = column;
            this.sortDirection = sortDirection;
        }

        SortElement()
        {

        }
    }
}