using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolNotebook.ViewModels
{
    public class ReminderNoteViewModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50, ErrorMessage = "Notes can not be longer than 200 characters.")]
        public string Notes { get; set; }
    }
}
