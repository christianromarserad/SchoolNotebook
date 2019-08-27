using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace SchoolNotebook.Models
{
    public partial class User
    {
        public User()
        {
            Bookmark = new HashSet<Bookmark>();
            Notebook = new HashSet<Notebook>();
            NotebookCollection = new HashSet<NotebookCollection>();
            NotebookComment = new HashSet<NotebookComment>();
            NotebookRate = new HashSet<NotebookRate>();
            NotebookShare = new HashSet<NotebookShare>();
            ReminderNote = new HashSet<ReminderNote>();
        }

        public string Email { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }

        [JsonIgnore]
        public virtual ICollection<Bookmark> Bookmark { get; set; }
        [JsonIgnore]
        public virtual ICollection<Notebook> Notebook { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookCollection> NotebookCollection { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookComment> NotebookComment { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookRate> NotebookRate { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookShare> NotebookShare { get; set; }
        [JsonIgnore]
        public virtual ICollection<ReminderNote> ReminderNote { get; set; }
    }
}
