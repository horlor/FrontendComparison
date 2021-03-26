using BlazorApp.Models;
using BlazorApp.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace BlazorApp.Services
{
    public class TodosRepo : RepositoryBase<ListWithTodos>
    {
        private readonly ApiService api = new ApiService();
        public string Id { get; set; }
        public async override Task Invalidate() {
                var res = await api.GetListWithTodosAsync(Id);
                Value = res;

        }

        public async Task ChangeTodoDone(TodoDto todoDto)
        {
            await api.ChangeTodoDone(todoDto);
            await Invalidate();
        }

        public async Task ChangeTodoImportant(TodoDto todoDto)
        {
            await api.ChangeTodoImportant(todoDto);
            await Invalidate();
        }

        public async Task DeleteTodo(TodoDto todoDto)
        {
            await api.DeleteTodo(todoDto);
            await Invalidate();
        }

        public async Task Update(TodoDto todo)
        {
            await api.UpdateTodo(todo);
            await Invalidate();
        }

        public async Task Add(TodoDto todo)
        {
            await api.CreateTodo(todo);
            await Invalidate();
        }

        public async Task DeleteTodos(ListDto listDto,bool onlyDone = true)
        {
            await api.DeleteTodosList(listDto.Id, onlyDone);
            await Invalidate();
        }

    }
}
