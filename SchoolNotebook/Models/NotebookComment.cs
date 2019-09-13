using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolNotebook.Models
{
    public partial class NotebookComment
    {
        public int Id { get; set; }
        public int NotebookId { get; set; }
        public string User { get; set; }
        public string Comment { get; set; }
        [JsonIgnore]
        public DateTime Date { get; set; }

        [JsonIgnore]
        public virtual Notebook Notebook { get; set; }
        [JsonIgnore]
        public virtual User UserNavigation { get; set; }

        [NotMapped]
        public string UserName
        {
            get
            {
                return UserNavigation.Name;
            }
        }

        [NotMapped]
        public string UserPicture
        {
            get
            {
                return UserNavigation.Picture;
            }
        }
        [NotMapped]
        public string DateFormatted
        {
            get
            {
                return Date.ToString("MMMM dd, yyyy");
            }
        }
    }
}
