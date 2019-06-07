using System;
using System.Collections.Generic;

namespace SchoolNotebook.Models
{
    public partial class NotebookPage
    {
        public int NotebookId { get; set; }
        public int PageNumber { get; set; }
        public string Notes { get; set; }

        public virtual Notebook Notebook { get; set; }
    }
}
