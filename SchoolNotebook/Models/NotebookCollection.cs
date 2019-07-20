using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolNotebook.Models
{
    public class NotebookCollection
    {
        public string User { get; set; }
        public int NotebookId { get; set; }

        [JsonIgnore]
        public virtual Notebook Notebook { get; set; }
        [JsonIgnore]
        public virtual User UserNavigation { get; set; }
    }
}
