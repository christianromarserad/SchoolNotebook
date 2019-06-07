using System;
using System.Collections.Generic;

namespace SchoolNotebook.Models
{
    public partial class NotebookShare
    {
        public string User { get; set; }
        public int NotebookId { get; set; }
        public bool EditPage { get; set; }
        public bool AddPage { get; set; }
        public bool DeletePage { get; set; }
        public DateTime DateShared { get; set; }

        public virtual Notebook Notebook { get; set; }
        public virtual User UserNavigation { get; set; }
    }
}
