using BlazorApp.Services;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp.Mvvm
{
    public abstract class StatefulComponentBase<TViewModel> : BindableComponentBase, IDisposable where TViewModel: IViewModel
    {
        [Inject]
        protected TViewModel vm { get; set; }

        protected override void OnInitialized()
        {
            Bind(vm);
            vm.Init();
            base.OnInitialized();
        }


        public void Dispose()
        {
            UnBind(vm);
        }


    }
}
