using BlazorApp.Mvvm;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace BlazorApp.Mvvm
{
    public abstract class RepositoryBase<T> : IState<T>
    {
        private T _value = default(T);
        public T Value {
            get => _value;
            set
            {
                SetValue(ref _value, value);
            }
        }

        protected void SetValue<S>(ref S property, S value, [CallerMemberName] string name = null)
        {
            property = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }

        public event PropertyChangedEventHandler PropertyChanged;

        public abstract Task Invalidate();

    }


}
