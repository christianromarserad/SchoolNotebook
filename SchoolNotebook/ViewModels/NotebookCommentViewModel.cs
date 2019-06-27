using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolNotebook.ViewModels
{
    public class NotebookCommentViewModel
    {
        public int Id { get; set; }
        public int NotebookId { get; set; }
        public string User { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
    }
}
