using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolNotebook.ViewModels
{
    public class BookmarkViewModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50, ErrorMessage = "Name can not be longer than 50 characters.")]
        public string Name { get; set; }
        [Url(ErrorMessage = "Invalid Url")]
        [Required]
        public string Url { get; set; }
    }
}
