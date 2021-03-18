using BlazorApp.Models;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace BlazorApp.Services
{
    public class StoreService : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnChange([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }

        protected void SetValue<T>(ref T property, T value, [CallerMemberName] string name = null)
        {
            property = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }

        private ListWithTodos _list;
        public ListWithTodos List
        {
            get => _list;
            set
            {
                SetValue(ref _list, value);
            }
        }

        private ICollection<ListDto> _lists;
        public ICollection<ListDto> Lists
        {
            get => _lists;
            set
            {
                SetValue(ref _lists, value);
            }
        }

        public async Task LoadLists()
        {
            var api = new ApiService();    
            Lists = await api.GetLists();
        }

        public async Task AddList(ListDto dto)
        {
            var api = new ApiService();
            await api.AddList(dto);
            await LoadLists();
        }
    }
}
