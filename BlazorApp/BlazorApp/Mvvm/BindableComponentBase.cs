using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp.Mvvm
{
    public abstract class BindableComponentBase : ComponentBase
    {
        protected void OnStateChanged(object sender, PropertyChangedEventArgs e)
        {
            StateHasChanged();
        }

        protected void Bind(INotifyPropertyChanged state)
        {
            state.PropertyChanged += OnStateChanged;
        }

        protected void UnBind(INotifyPropertyChanged state)
        {
            state.PropertyChanged -= OnStateChanged;
        }
    }
}
