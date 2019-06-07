using System;
using System.Collections.Generic;

namespace SchoolNotebook.Models
{
    public partial class NotebookRate
    {
        public string User { get; set; }
        public int NotebookId { get; set; }
        public int Rate { get; set; }

        public virtual Notebook Notebook { get; set; }
        public virtual User UserNavigation { get; set; }
    }
}
