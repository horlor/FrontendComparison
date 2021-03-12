using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Data;

namespace TodoApi.Models
{
    public class ListDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class ListWithTodosDto : ListDto
    {
        public ICollection<TodoDto> Todos { get; set; }
    }

    public static class ListMapExtensions
    {
        public static ListDto Map(this TodoList list)
        {
            return new ListDto()
            {
                Id = list.Id,
                Name = list.Name,
            };
        }

        public static ListWithTodosDto MapWithTodos(this TodoList list)
        {
            return new ListWithTodosDto()
            {
                Id = list.Id,
                Name = list.Name,
                Todos = list.Items.Select(t => t.Map()).ToList()
            };
        }
    }

}
