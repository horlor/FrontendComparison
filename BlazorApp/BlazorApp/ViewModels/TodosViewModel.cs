using BlazorApp.Models;
using BlazorApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp.ViewModels
{
    public class TodosViewModel
    {
        private readonly ApiService service;
        public TodosViewModel(ApiService service)
        {
            this.service = service;
        }


        public ListWithTodos List { get; set; }

        public TodoDto Selected { get; set; }


        public async Task Load(long ListId)
        {
            List = await service.GetListWithTodosAsync(ListId);
            Selected = null;
        }

        public async Task ChangeImportant(TodoDto todo)
        {
            await service.ChangeTodoDone(todo);
            todo.Important = !todo.Important;
        }

        public async Task ChangeDone(TodoDto todo)
        {
            await service.ChangeTodoDone(todo);
            todo.Done = !todo.Done;
        }

        public void ChangeSelected(TodoDto todo)
        {
            Selected = todo;
        }


    }
}
