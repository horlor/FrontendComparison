using BlazorApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace BlazorApp.Services
{
    public class ApiService
    {
        private readonly HttpClient httpClient = new HttpClient();

        public ApiService()
        {
            httpClient.BaseAddress = new Uri( "http://localhost:5000/");
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNTQyNmI4OS1hMmFhLTQ4ODktYTFiNC1hODNlZGRmOGYyMmEiLCJqdGkiOiJkYjg1MjZkNC03Y2IxLTQxZDctODU0ZC04OTkzODVmYjgxZTMiLCJ1c2VybmFtZSI6ImxvcmFudCIsImV4cCI6MTYxNTgzNDYxNiwiaXNzIjoiVG9kbyIsImF1ZCI6IlRvZG8tdXNlcnMifQ._XWktCmpbOTHcvEvNyA9KDkruMi6glaCadW859wDNII");
        }

        public async Task<ICollection<ListDto>> GetLists()
        {
            return await httpClient.GetFromJsonAsync<ICollection<ListDto>>("/api/lists");
        }

        public async Task<ListWithTodos> GetListWithTodosAsync(long id)
        {
            var listTask = httpClient.GetFromJsonAsync<ListDto>($"/api/lists/{id}");
            var todosTask = httpClient.GetFromJsonAsync < IList<TodoDto>>($"/api/todos?listId={id}");
            await Task.WhenAll(new Task[]{ listTask, todosTask});
            return new ListWithTodos
            {
                Id = listTask.Result.Id,
                Name = listTask.Result.Name,
                Todos = todosTask.Result,
            };
        }

        public async Task<TodoDto> ChangeTodoDone(TodoDto todoDto)
        {
            var todo = todoDto.Clone();
            todo.Done = !todo.Done;
            var ret =  await httpClient.PutWithJsonAsync<TodoDto, TodoDto>($"/api/todos/{todo.Id}", todo);
            return ret;
        }

        public async Task<TodoDto> ChangeTodoImportant(TodoDto todoDto)
        {
            var todo = todoDto.Clone();
            todo.Important = !todo.Important;
            return await httpClient.PutWithJsonAsync<TodoDto,TodoDto>($"/api/todos/{todo.Id}", todo);
            
        }

        public async Task<TodoDto> UpdateTodo(TodoDto tododto)
        {
            return await httpClient.PutWithJsonAsync<TodoDto, TodoDto>($"/api/todos/{tododto.Id}", tododto);
        }

        public async Task<TodoDto> CreateTodo(TodoDto todo)
        {
            return await httpClient.PostWithJsonAsync<TodoDto, TodoDto>($"/api/todos", todo);
        }
    }
}
