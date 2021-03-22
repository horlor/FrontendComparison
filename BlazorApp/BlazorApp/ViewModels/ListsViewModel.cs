using BlazorApp.Models;
using BlazorApp.Mvvm;
using BlazorApp.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp.ViewModels
{
    public class ListsViewModel : ViewModelBase
    {
        private readonly ListRepo listRepo;

        public ListsViewModel(StoreService storeService)
        {
            listRepo = storeService.ListRepo;
            Subscribe(listRepo);
        }


        public ICollection<ListDto> Value
        {
            get => listRepo.Value;
            set
            {
                listRepo.Value = value;
            }
        }

        public string NewTitle { get; set; }

        public async Task AddList()
        {
            await listRepo.AddList(new ListDto()
            {
                Name = NewTitle
            });
            NewTitle = "";
        }

        public async override Task Init()
        {
            await listRepo.Invalidate();
        }
    }
}
