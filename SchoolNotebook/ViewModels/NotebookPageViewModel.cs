using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolNotebook.ViewModels
{
    public class NotebookPageViewModel
    {
        public int NotebookId { get; set; }
        public int PageNumber { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }
    }
}
