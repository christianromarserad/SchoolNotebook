﻿using System;
using System.Collections.Generic;

namespace SchoolNotebook.Models
{
    public partial class NotebookComment
    {
        public int Id { get; set; }
        public int NotebookId { get; set; }
        public string User { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }

        public virtual Notebook Notebook { get; set; }
        public virtual User UserNavigation { get; set; }
    }
}
