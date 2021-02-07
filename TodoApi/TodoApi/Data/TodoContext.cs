using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;

namespace TodoApi.Data
{
    public class TodoContext : IdentityDbContext<User>
    {
        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<TodoList> TodoLists { get; set; }

        public TodoContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoItem>(e =>
            {
                e.Property(i => i.Id).ValueGeneratedOnAdd();
                e.HasOne(i => i.List).WithMany(l => l.Items).HasForeignKey(t => t.ListId).OnDelete(DeleteBehavior.Cascade);
                e.HasOne(i => i.Owner).WithMany(u => u.Todos).HasForeignKey(i => i.OwnerId);
            });
            modelBuilder.Entity<TodoList>(e =>
            {
                e.Property(l => l.Id).ValueGeneratedOnAdd();
                e.HasMany(l => l.Items);
                
                e.HasOne(l => l.Owner).WithMany(u => u.Lists).HasForeignKey(l => l.OwnerId);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
