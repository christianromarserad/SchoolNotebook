﻿using System;
using System.Collections.Generic;

namespace SchoolNotebook.Models
{
    public partial class NotebookShare
    {
        public string User { get; set; }
        public int NotebookId { get; set; }
        public bool CanEdit { get; set; }
        public DateTime DateShared { get; set; }

        public virtual Notebook Notebook { get; set; }
        public virtual User UserNavigation { get; set; }
    }
}
