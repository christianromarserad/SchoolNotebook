using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace SchoolNotebook.Models
{
    public partial class NotebookPage
    {
        public int NotebookId { get; set; }
        public int PageNumber { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }

        [JsonIgnore]
        public virtual Notebook Notebook { get; set; }
    }
}
