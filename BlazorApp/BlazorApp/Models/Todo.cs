﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp.Models
{
    public class TodoDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Important { get; set; }
        public bool Done { get; set; }
        public DateTime? DeadLine { get; set; }
        public string OwnerId { get; set; }
        public string ListId { get; set; }

        public TodoDto Clone()
        {
            return new TodoDto()
            {
                Id = this.Id,
                Title = Title,
                DeadLine = DeadLine,
                Description = Description,
                Important = Important,
                Done = Done,
                OwnerId = OwnerId,
                ListId = ListId,
            };
        }
    }

}
