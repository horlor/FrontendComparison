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
        public async Task<IActionResult> GetMyTodos([FromQuery] bool important = false, [FromQuery] bool urgent=false, [FromQuery] bool all = false, [FromQuery] string listId = null)
        {
            var query = dbContext.TodoItems
                .Where(t => t.OwnerId == UserId);
            if(!all)
                query = query.Where(t => t.ListId == listId);
            if (important)
                query = query.Where(t => t.Important);
            if (urgent)
            {
                var urgentdate = DateTimeOffset.Now + new TimeSpan(7, 0, 0, 0);
                query = query.Where(t => t.DeadLine != null && t.DeadLine.Value <urgentdate );
            }
                 
            var todos = await query.Select(t=>t.Map()).ToListAsync();
            todos.Reverse();
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
                Id = null,
                DeadLine = todo.DeadLine,
                Done = todo.Done,
                Description = todo.Description,
                Important = todo.Important,
                ListId = todo.ListId,
                Title = todo.Title,
                OwnerId = UserId,
            };

            var ret = dbContext.TodoItems.Add(db);
            await dbContext.SaveChangesAsync();
            return Ok(ret.Entity.Map());
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] string id, [FromBody] TodoDto item)
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
        public async Task<IActionResult> DeleteTodo([FromRoute] string id)
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

        [Authorize]
        [HttpDelete]
        public async Task<ActionResult> DeleteTodos([FromQuery] bool important = false, [FromQuery] bool urgent = false, [FromQuery] bool all = false, [FromQuery] string listId = null, [FromQuery] bool onlyDone = false)
        {
            var query = dbContext.TodoItems
                .Where(t => t.OwnerId == UserId);
            if (!all)
                query = query.Where(t => t.ListId == listId);
            if (important)
                query = query.Where(t => t.Important);
            if (urgent)
                query = query.Where(t => t.DeadLine < DateTime.Now + new TimeSpan(7, 0, 0, 0));
            if (onlyDone)
                query = query.Where(t => t.Done);
            dbContext.RemoveRange(query);
            await dbContext.SaveChangesAsync();
            return NoContent(); 
        }

    }
}
