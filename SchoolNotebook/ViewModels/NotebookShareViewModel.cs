using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolNotebook.ViewModels
{
    public class NotebookShareViewModel
    {
        public string User { get; set; }
        public int NotebookId { get; set; }
        public bool CanEdit { get; set; }
    }
}
