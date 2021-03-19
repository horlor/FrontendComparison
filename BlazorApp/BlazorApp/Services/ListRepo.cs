using BlazorApp.Models;
using BlazorApp.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp.Services
{
    public class ListRepo : RepositoryBase<ICollection<ListDto>>
    {
        public async override Task Invalidate()
        {
            var api = new ApiService();
            Value = await api.GetLists();
        }
        
        public async Task AddList(ListDto listDto)
        {
            var api = new ApiService();
            await api.AddList(listDto);
            await Invalidate();
        }
    }
}
