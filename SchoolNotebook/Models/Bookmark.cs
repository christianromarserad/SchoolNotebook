using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SchoolNotebook.Models
{
    public partial class Bookmark
    {
        [Key]
        public int Id { get; set; }
        public string User { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }

        [JsonIgnore]
        public virtual User UserNavigation { get; set; }
    }
}
