using AntDesign;
using BlazorApp.Models;
using BlazorApp.Mvvm;
using BlazorApp.Services;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net;

namespace BlazorApp.ViewModels
{
    public class TodosViewModel : ViewModelBase
    {
        private readonly ApiService service;
        private readonly StoreService store;
        private readonly NavigationManager navigationManager;
        private readonly TodosRepo todosRepo;
        private readonly ModalService modalService;
        public TodosViewModel(ApiService service, NavigationManager navigationManager, ModalService modalService, StoreService store)
        {
            this.store = store;
            this.service = service;
            this.navigationManager = navigationManager;
            this.todosRepo = store.Todos;
            this.modalService = modalService;
            Subscribe(todosRepo);
        }


        public ListWithTodos List {
            get => todosRepo.Value;
        }

        private Error error;
        public Error Error
        {
            get => error;
            private set
            {
                SetValue(ref error, value);
            }
        }

        public TodoDto Selected { get; set; }


        public string NewTodo { get; set; }


        public async Task Load(string ListId)
        {
            todosRepo.Id = ListId;
            Selected = null;
            try
            {
                await todosRepo.Invalidate();
            }
            catch(HttpRequestException e)
            {
                Error = Error.FromException(e);
            }
        }

        public async Task ChangeImportant(TodoDto todo)
        {
            try
            {
                await todosRepo.ChangeTodoDone(todo);
            }
            catch(HttpRequestException e)
            {
                Error = Error.FromException(e);
            }

        }

        public async Task ChangeDone(TodoDto todo)
        {
            try
            {
                await todosRepo.ChangeTodoDone(todo);
            }
            catch (HttpRequestException e)
            {
                Error = Error.FromException(e);
            }
        }

        public void ChangeSelected(TodoDto todo)
        {
            try
            {
                Selected = todo?.Clone();
            }
            catch (HttpRequestException e)
            {
                Error = Error.FromException(e);
            }

        }

        public async Task AddTodo()
        {
            try
            {
                await todosRepo.Add(new TodoDto()
                {
                    Id = null,
                    Title = NewTodo,
                    ListId = List.Id,
                });
                NewTodo = "";
            }
            catch (HttpRequestException e)
            {
                Error = Error.FromException(e);
            }

        }

        public async Task UpdateTodo()
        {
            try
            {
                await todosRepo.Update(Selected);
                Selected = null;
            }
            catch (HttpRequestException e)
            {
                Error = Error.FromException(e);
            }
        }

        public async Task DeleteTodo()
        {
            try
            {
                await todosRepo.DeleteTodo(Selected);
            }
            catch (HttpRequestException e)
            {
                Error = Error.FromException(e);
            }
        }

        public async Task StarSelected()
        {
            try
            {
                await todosRepo.ChangeTodoImportant(Selected);
            }
            catch (HttpRequestException e)
            {
                Error = Error.FromException(e);
            }
        }

        public async Task DeleteAllTodos()
        {
            try
            {
                await todosRepo.DeleteTodos(List, true);
            }
            catch (HttpRequestException e)
            {
                Error = Error.FromException(e);
            }
            
        }

        public async Task DeleteAllDoneTodos()
        {
            try
            {
                await todosRepo.DeleteTodos(List, true);
            }
            catch (HttpRequestException e)
            {
                Error = Error.FromException(e);
            }
            
        }

        public async Task DeleteList()
        {
            try
            {
                await store.ListRepo.DeleteList(List);
                navigationManager.NavigateTo("/");
            }
            catch (HttpRequestException e)
            {
                Error = Error.FromException(e);
            }

        }

        public override Task Init()
        {
            return Task.CompletedTask;
        }

        public void DismissError()
        {
            Error = null;
        }

    }
}
