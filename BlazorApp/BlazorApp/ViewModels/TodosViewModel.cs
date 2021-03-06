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

        private TodoDto _selectedRef;

        public string NewTodo { get; set; }


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
            Selected = todo?.Clone();
            _selectedRef = todo;
        }

        public async Task AddTodo()
        {
            var ret = await service.CreateTodo(new TodoDto()
            {
                Id = 0,
                Title = NewTodo,
                ListId = List.Id,
            });
            List.Todos.Insert(0,ret);
            NewTodo = "";
        }

        public async Task UpdateTodo()
        {
            var ret = await service.UpdateTodo(Selected);
            _selectedRef.Title = ret.Title;
            _selectedRef.DeadLine = ret.DeadLine;
            _selectedRef.Description = ret.Description;

        }

        public async Task DeleteTodo()
        {
            await service.DeleteTodo(Selected);
            _ = List.Todos.Remove(_selectedRef);
            Selected = null;
            _selectedRef = null;

        }
    }
}
