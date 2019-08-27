using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolNotebook.Models
{
    public partial class Notebook
    {
        public Notebook()
        {
            NotebookCollection = new HashSet<NotebookCollection>();
            NotebookComment = new HashSet<NotebookComment>();
            NotebookPage = new HashSet<NotebookPage>();
            NotebookRate = new HashSet<NotebookRate>();
            NotebookShare = new HashSet<NotebookShare>();
        }

        public int Id { get; set; }
        public string User { get; set; }
        public string Name { get; set; }
        public bool Public { get; set; }
        public string Image { get; set; }
        public string ImageName { get; set; }

        [JsonIgnore]
        public virtual User UserNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookCollection> NotebookCollection { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookComment> NotebookComment { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookPage> NotebookPage { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookRate> NotebookRate { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotebookShare> NotebookShare { get; set; }

        [NotMapped]
        public double AverageRate
        {
            get
            {
                double total = 0;
                var notebookRates = NotebookRate;
                foreach (var notebookRate in NotebookRate)
                {
                    total = notebookRate.Rate + total;
                }

                if (total != 0)
                {
                    return total / NotebookRate.Count;
                }
                else
                {
                    return 0;
                }
            }
        }

        [NotMapped]
        public double NumberOfRates
        {
            get
            {
                return NotebookRate.Count;
            }
        }

        [NotMapped]
        public string UserName
        {
            get
            {
                return UserNavigation.Name;
            }
        }
    }
}
