using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Data
{
    public class User : IdentityUser
    {
        [field: NonSerialized]
        public virtual ICollection<TodoItem> Todos { get; set; }
        [field: NonSerialized]
        public virtual ICollection<TodoList> Lists { get; set; }
    }
}
