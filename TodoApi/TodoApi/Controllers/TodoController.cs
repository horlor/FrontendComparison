using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Authorize]
    [Route("api/todos")]
    [ApiController]
    public class TodoController : BaseController
    {
        private readonly TodoContext dbContext;

        public TodoController(TodoContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetMyTodos([FromQuery] long? listId)
        {
            var query = dbContext.TodoItems
                .Where(t => t.OwnerId == UserId);
            query = query.Where(t => t.ListId == listId);
            var todos = await query.Select(t=>t.Map()).ToListAsync();
            return Ok(todos);
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodo([FromRoute] long id)
        {
            var todo = await dbContext.TodoItems
                .FirstOrDefaultAsync();
            if (todo is null)
                return NotFound();
            if (todo.OwnerId != UserId)
                return Forbid();
            return Ok(todo.Map());
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody] TodoDto todo)
        {
            var list = await dbContext.TodoLists.FirstOrDefaultAsync(l => l.Id == todo.ListId);
            if (list == null && todo.ListId != null)
                return Conflict();
            var db = new TodoItem()
            {
                Id = 0,
                DeadLine = todo.DeadLine,
                Done = todo.Done,
                Description = todo.Description,
                Important = todo.Important,
                ListId = todo.ListId,
                Title = todo.Title,
                OwnerId = todo.OwnerId
            };

            var ret = dbContext.TodoItems.Add(db);
            await dbContext.SaveChangesAsync();
            return Ok(ret.Entity.Map());
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] long id, [FromBody] TodoDto item)
        {
            var db = await dbContext.TodoItems
                .Include(t => t.Owner)
                .Include(t => t.List)
                .FirstOrDefaultAsync(t => t.Id == id);
            if (db == null)
                return NotFound();
            if (db.OwnerId != UserId)
                return Forbid();
            var list = await dbContext.TodoLists
                .FirstOrDefaultAsync(l => l.Id == item.ListId);
            if (list == null && item.ListId!=null)
                return Conflict();
            db.Important = item.Important;
            db.Title = item.Title;
            db.Done = item.Done;
            db.DeadLine = item.DeadLine;
            db.Description = item.Description;
            db.Important = item.Important;
            db.ListId = item.ListId;
            await dbContext.SaveChangesAsync();
            return Ok(db.Map());
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] long id)
        {
            var db = await dbContext.TodoItems
                .FirstOrDefaultAsync(i => i.Id == id);
            if (db == null)
                return NotFound();
            if(db.OwnerId != UserId)
                return Forbid();
            dbContext.TodoItems.Remove(db);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }

    }
}
