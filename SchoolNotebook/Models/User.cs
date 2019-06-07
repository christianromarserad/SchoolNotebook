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
            NotebookComment = new HashSet<NotebookComment>();
            NotebookRate = new HashSet<NotebookRate>();
            NotebookShare = new HashSet<NotebookShare>();
            ReminderNote = new HashSet<ReminderNote>();
        }

        public string Email { get; set; }

        public virtual ICollection<Bookmark> Bookmark { get; set; }
        public virtual ICollection<Notebook> Notebook { get; set; }
        public virtual ICollection<NotebookComment> NotebookComment { get; set; }
        public virtual ICollection<NotebookRate> NotebookRate { get; set; }
        public virtual ICollection<NotebookShare> NotebookShare { get; set; }
        public virtual ICollection<ReminderNote> ReminderNote { get; set; }
    }
}
