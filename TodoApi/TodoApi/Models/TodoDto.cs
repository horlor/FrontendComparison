using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Data;

namespace TodoApi.Models
{
    public class TodoDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Important { get; set; }
        public bool Done { get; set; }
        public DateTimeOffset? DeadLine { get; set; }
        public string OwnerId { get; set; }
        public string ListId { get; set; }
    }

    public static class TodoMapExtensions
    {
        public static TodoDto Map(this TodoItem todo)
        {
            return new TodoDto()
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                Important = todo.Important,
                Done = todo.Done,
                DeadLine = todo.DeadLine,
                OwnerId = todo.OwnerId,
                ListId = todo.ListId,
            };
        }
    }
}
