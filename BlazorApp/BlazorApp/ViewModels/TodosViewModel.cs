using BlazorApp.Models;
using BlazorApp.Services;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp.ViewModels
{
    public class TodosViewModel
    {
        private readonly ApiService service;
        private readonly NavigationManager navigationManager;
        public TodosViewModel(ApiService service, NavigationManager navigationManager)
        {
            this.service = service;
            this.navigationManager = navigationManager;
        }


        public ListWithTodos List { get; set; }

        public TodoDto Selected { get; set; }

        private TodoDto _selectedRef;

        public string NewTodo { get; set; }


        public async Task Load(string ListId)
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
            Console.WriteLine(NewTodo);
            var ret = await service.CreateTodo(new TodoDto()
            {
                Id = null,
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
            Selected = null;

        }

        public async Task DeleteTodo()
        {
            await service.DeleteTodo(Selected);
            _ = List.Todos.Remove(_selectedRef);
            Selected = null;
            _selectedRef = null;

        }

        public async Task StarSelected()
        {
            await service.ChangeTodoImportant(Selected);
            _selectedRef.Important = !_selectedRef.Important;
        }

        public async Task DeleteAllTodos()
        {
            await service.DeleteTodosList(List.Id, false);
            await Load(List.Id);
        }

        public async Task DeleteAllDoneTodos()
        {
            await service.DeleteTodosList(List.Id, true);
            await Load(List.Id);
        }

        public async Task DeleteList()
        {
            await service.DeleteList(List);
            navigationManager.NavigateTo("/");
        }
    }
}
