using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp.Models
{
    public class ListDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }


    public class ListWithTodos : ListDto
    {
        public IList<TodoDto> Todos { get; set; }
    }

}
