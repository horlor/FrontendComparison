using BlazorApp.Models;
using BlazorApp.Mvvm;
using BlazorApp.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
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

        private Error error;
        public Error Error
        {
            get => error;
            set
            {
                SetValue(ref error, value);
            }
        }

        public async Task AddList()
        {
            try
            {
                await listRepo.AddList(new ListDto()
                {
                    Name = NewTitle
                });
                NewTitle = "";
            }
            catch (HttpRequestException e)
            {
                Error = Error.FromException(e);
            }

        }

        public async override Task Init()
        {
            try
            {
                await listRepo.Invalidate();
            }
            catch (HttpRequestException e)
            {
                Error = Error.FromException(e);
            }

        }

        public void DismissError()
        {
            Error = null;
        }
    }
}
