using AntDesign;
using BlazorApp.Models;
using BlazorApp.Mvvm;
using BlazorApp.Services;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp.ViewModels
{
    public class TodosViewModel : ViewModelBase
    {
        private readonly ApiService service;
        private readonly StoreService store;
        private readonly NavigationManager navigationManager;
        private readonly TodosRepo todosRepo;
        public TodosViewModel(ApiService service, NavigationManager navigationManager, ModalService modalService, StoreService store)
        {
            this.store = store;
            this.service = service;
            this.navigationManager = navigationManager;
            this.todosRepo = store.Todos;
            Subscribe(todosRepo);
        }


        public ListWithTodos List {
            get => todosRepo.Value;
                }

        public TodoDto Selected { get; set; }

        private TodoDto _selectedRef;

        public string NewTodo { get; set; }


        public async Task Load(string ListId)
        {
            todosRepo.Id = ListId;
            Selected = null;
            await todosRepo.Invalidate();
        }

        public async Task ChangeImportant(TodoDto todo)
        {
            await todosRepo.ChangeTodoDone(todo);
            todo.Important = !todo.Important;
        }

        public async Task ChangeDone(TodoDto todo)
        {
            await todosRepo.ChangeTodoDone(todo);
            todo.Done = !todo.Done;
        }

        public void ChangeSelected(TodoDto todo)
        {
            Selected = todo?.Clone();
            _selectedRef = todo;
        }

        public async Task AddTodo()
        {
            await todosRepo.Add(new TodoDto()
            {
                Id = null,
                Title = NewTodo,
                ListId = List.Id,
            });
            NewTodo = "";
        }

        public async Task UpdateTodo()
        {
            await todosRepo.Update(Selected);
            Selected = null;
        }

        public async Task DeleteTodo()
        {
            await todosRepo.DeleteTodo(Selected);
        }

        public async Task StarSelected()
        {
            await todosRepo.ChangeTodoImportant(Selected);
            _selectedRef.Important = !_selectedRef.Important;
        }

        public async Task DeleteAllTodos()
        {
            await todosRepo.DeleteTodos(List, true);
        }

        public async Task DeleteAllDoneTodos()
        {
            await todosRepo.DeleteTodos(List, true);
        }

        public async Task DeleteList()
        {
            await store.ListRepo.DeleteList(List);
            navigationManager.NavigateTo("/");
        }

        public async override Task Init()
        {
            await todosRepo.Invalidate();
        }
    }
}
