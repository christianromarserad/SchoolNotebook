using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace SchoolNotebook.Models
{
    public partial class Bookmark
    {
        public int Id { get; set; }
        public string User { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }

        [JsonIgnore]
        public virtual User UserNavigation { get; set; }
    }
}
