﻿using Microsoft.AspNetCore.Authorization;
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
    [Route("api/lists")]
    [ApiController]
    public class TodoListController : BaseController
    {
        private readonly TodoContext dbcontext;

        public TodoListController(TodoContext todoContext)
        {
            this.dbcontext = todoContext;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetLists()
        {
            var lists = await dbcontext.TodoLists
                .Where(l => l.OwnerId == UserId)
                .Include(l => l.Owner)
                .Select(l => l.Map())
                .ToListAsync();
            return Ok(lists);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetList([FromRoute] string id)
        {
            var list = await dbcontext.TodoLists
                .Include(l => l.Items)
                .FirstOrDefaultAsync(l=> l.Id == id);
            if (list == null)
                return NotFound();
            return Ok(list.MapWithTodos());
        }

        [HttpPost]
        public async Task<IActionResult> AddList([FromBody] TodoList list)
        {
            list.Id = null;
            list.OwnerId = UserId;
            var ret = dbcontext.TodoLists.Add(list);
            await dbcontext.SaveChangesAsync();
            return Ok(ret.Entity.Map());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateList([FromRoute] string id, [FromBody] TodoList list)
        {
            var db = await dbcontext.TodoLists
                .FirstOrDefaultAsync(l => l.Id == id);
            if (db == null)
                return NotFound();
            if (db.OwnerId != UserId)
                return Forbid();

            db.Name = list.Name;
            await dbcontext.SaveChangesAsync();
            return Ok(db.Map());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteList([FromRoute] string id)
        {
            var db = await dbcontext.TodoLists
                .FirstOrDefaultAsync(l => l.Id == id);
            if (db == null)
                return NotFound();
            if (db.OwnerId != UserId)
                return Forbid();
            dbcontext.TodoLists.Remove(db);
            await dbcontext.SaveChangesAsync();
            return NoContent();
        }
    }
}
