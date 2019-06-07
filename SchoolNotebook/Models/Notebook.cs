using System;
using System.Collections.Generic;

namespace SchoolNotebook.Models
{
    public partial class Notebook
    {
        public Notebook()
        {
            NotebookComment = new HashSet<NotebookComment>();
            NotebookPage = new HashSet<NotebookPage>();
            NotebookRate = new HashSet<NotebookRate>();
            NotebookShare = new HashSet<NotebookShare>();
        }

        public int Id { get; set; }
        public string User { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public bool Public { get; set; }

        public virtual User UserNavigation { get; set; }
        public virtual ICollection<NotebookComment> NotebookComment { get; set; }
        public virtual ICollection<NotebookPage> NotebookPage { get; set; }
        public virtual ICollection<NotebookRate> NotebookRate { get; set; }
        public virtual ICollection<NotebookShare> NotebookShare { get; set; }
    }
}
