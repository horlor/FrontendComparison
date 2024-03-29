﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Data
{
    public class TodoItem
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Important { get; set; }
        public bool Done { get; set; }
        public DateTimeOffset? DeadLine { get; set; }
        public string OwnerId { get; set; }
        public virtual User Owner { get; set; }
        public string ListId { get; set; }
        public virtual TodoList List { get; set; }
    }
}
