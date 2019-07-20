using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace SchoolNotebook.Models
{
    public partial class Notebook
    {
        public Notebook()
        {
            NotebookComment = new HashSet<NotebookComment>();
            NotebookPage = new HashSet<NotebookPage>();
            NotebookRate = new HashSet<NotebookRate>();
            NotebookShare = new HashSet<NotebookShare>();
        }

        public int Id { get; set; }
        public string User { get; set; }
        public string Name { get; set; }
        public bool Public { get; set; }

        [JsonIgnore]
        public virtual User UserNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookComment> NotebookComment { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookPage> NotebookPage { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookRate> NotebookRate { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookShare> NotebookShare { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookCollection> NotebookCollection { get; set; }
    }
}
