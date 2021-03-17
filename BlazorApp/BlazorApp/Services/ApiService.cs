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
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNTE0NzY3OS0wMjFlLTRiOGMtYjJmZi1kNTVhY2YxYTBmMmMiLCJqdGkiOiJlNmU3Yzc5Mi03Y2JkLTRhM2ItYjA0Ni1iYjY4YzRmNGJhOWUiLCJ1c2VybmFtZSI6ImxvcmFudCIsImV4cCI6MTYxNjgzODk5NSwiaXNzIjoiVG9kbyIsImF1ZCI6IlRvZG8tdXNlcnMifQ.arl6MQqt1uYQtwMlEitcywMS4IUY1aunoXrffRY9T80");
        }

        public async Task<ICollection<ListDto>> GetLists()
        {
            var list = await httpClient.GetFromJsonAsync<IList<ListDto>>("/api/lists");
            var ret = new List<ListDto>();
            ret.Add(new ListDto()
            {
                Id = "general",
                Name = "General"
            });
            ret.Add(new ListDto()
            {
                Id = "important",
                Name = "Important",
            });
            ret.Add(new ListDto()
            {
                Id = "urgent",
                Name = "Urgent",
            });
            ret.AddRange(list);
            return ret;
        }

        public async Task<ListWithTodos> GetListWithTodosAsync(string id)
        {
            Task<IList<TodoDto>> todos;
            Task<ListDto> list;
            if(id == "general")
            {
                list = Task.FromResult(new ListDto
                {
                    Id = "general",
                    Name = "General",
                });
                todos = httpClient.GetFromJsonAsync<IList<TodoDto>>($"/api/todos");
            }
            else if(id == "important")
            {
                list = Task.FromResult(new ListDto
                {
                    Id = "important",
                    Name = "Important",
                });
                todos = httpClient.GetFromJsonAsync<IList<TodoDto>>($"/api/todos?all=true&important=true");
            }
            else if(id == "urgent")
            {
                list = Task.FromResult(new ListDto
                {
                    Id = "urgent",
                    Name = "Urgent",
                });
                todos = httpClient.GetFromJsonAsync<IList<TodoDto>>($"/api/todos?all=true&urgent=true");
            }
            else
            {
                list = httpClient.GetFromJsonAsync<ListDto>($"/api/lists/{id}");
                todos = httpClient.GetFromJsonAsync<IList<TodoDto>>($"/api/todos?listId={id}");
            }

            await Task.WhenAll(new Task[]{ list, todos});
            return new ListWithTodos
            {
                Id = list.Result.Id,
                Name = list.Result.Name,
                Todos = todos.Result,
            };
        }

        public async Task<ListDto> AddList(ListDto list)
        {
            var ret = await httpClient.PostWithJsonAsync<ListDto, ListDto>($"/api/lists", list);
            return ret;
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

        public async Task DeleteTodo(TodoDto todo)
        {
            await httpClient.DeleteAsync($"/api/todos/{todo.Id}");
        }

        public async Task DeleteList(ListDto list)
        {
            await httpClient.DeleteAsync($"/api/lists/{list.Id}");
        }

        public async Task DeleteTodosList(string id, bool onlyDone)
        {
            if (id == "general")
            {
                await httpClient.DeleteAsync($"/api/todos?onlyDone={onlyDone}");
            }
            else if (id == "important")
            {
                await httpClient.DeleteAsync($"/api/todos?all=true&important=true&onlyDone={onlyDone}");
            }
            else if (id == "urgent")
            {
                await httpClient.DeleteAsync($"/api/todos?all=true&urgent=true&onlyDone={onlyDone}");
            }
            else
            {
                await httpClient.DeleteAsync($"/api/todos?listId={id}&onlyDone={onlyDone}");
            }
        }
    }
}
