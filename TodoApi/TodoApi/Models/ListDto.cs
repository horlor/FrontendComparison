using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Data;

namespace TodoApi.Models
{
    public class ListDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
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
    }
}
