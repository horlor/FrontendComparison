using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace BlazorApp.Mvvm
{
    public abstract class ViewModelBase : IViewModel
    {
        public virtual event PropertyChangedEventHandler PropertyChanged;
        protected void SetValue<S>(ref S property, S value, [CallerMemberName] string name = null)
        {
            property = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }

        public abstract Task Init();
    }
}
