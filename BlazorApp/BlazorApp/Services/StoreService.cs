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
    public class StoreService
    {
        public ListRepo ListRepo { get; } = new ListRepo();
    }
}
