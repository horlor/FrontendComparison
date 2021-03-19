﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp.Mvvm
{
    public interface IState<T> : INotifyPropertyChanged
    {
        T Value { get; set; }
    }
}
