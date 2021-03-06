﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolNotebook.Models
{
    public partial class NotebookShare
    {
        public string User { get; set; }
        public int NotebookId { get; set; }
        public bool CanEdit { get; set; }
        public DateTime DateShared { get; set; }

        [JsonIgnore]
        public virtual Notebook Notebook { get; set; }
        [JsonIgnore]
        public virtual User UserNavigation { get; set; }

        [NotMapped]
        public string UserName {
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
    }
}
