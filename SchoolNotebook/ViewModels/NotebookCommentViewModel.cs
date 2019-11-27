using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolNotebook.ViewModels
{
    public class NotebookCommentViewModel
    {
        public int Id { get; set; }
        public int NotebookId { get; set; }
        public string User { get; set; }
        [Required]
        public string Comment { get; set; }
        public DateTime Date { get; set; }
    }
}
