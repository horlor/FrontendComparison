using BlazorApp.Models;
using BlazorApp.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace BlazorApp.Services
{
    public class ListRepo : RepositoryBase<ICollection<ListDto>>
    {
        private readonly ApiService api = new ApiService();
        public ListRepo()
        {
        }
        public async override Task Invalidate()
        {
            Value = await api.GetLists();
        }
        
        public async Task AddList(ListDto listDto)
        {
            await api.AddList(listDto);
            await Invalidate();
        }

        public async Task DeleteList(ListDto listDto)
        {
            await api.DeleteList(listDto);
            await Invalidate();
        }
    }
}
