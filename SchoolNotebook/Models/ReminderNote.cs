﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace SchoolNotebook.Models
{
    public partial class ReminderNote
    {
        public int Id { get; set; }
        public string User { get; set; }
        public string Notes { get; set; }

        [JsonIgnore]
        public virtual User UserNavigation { get; set; }
    }
}
