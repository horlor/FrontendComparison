using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Data
{
    public class TodoList
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string OwnerId { get; set; }
        public virtual User Owner { get; set; }
        [field: NonSerialized]
        public virtual ICollection<TodoItem> Items { get; set; }
    }
}
