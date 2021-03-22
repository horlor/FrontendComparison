using BlazorApp.Services;
using BlazorApp.ViewModels;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace BlazorApp
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            builder.Services.AddTransient(sp =>
            {
                var httpClient = new HttpClient();
                httpClient.BaseAddress = new Uri("http://localhost:5000/");
                httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNTE0NzY3OS0wMjFlLTRiOGMtYjJmZi1kNTVhY2YxYTBmMmMiLCJqdGkiOiJlNmU3Yzc5Mi03Y2JkLTRhM2ItYjA0Ni1iYjY4YzRmNGJhOWUiLCJ1c2VybmFtZSI6ImxvcmFudCIsImV4cCI6MTYxNjgzODk5NSwiaXNzIjoiVG9kbyIsImF1ZCI6IlRvZG8tdXNlcnMifQ.arl6MQqt1uYQtwMlEitcywMS4IUY1aunoXrffRY9T80");
                return httpClient;
            });
            builder.Services.AddSingleton<ApiService>(sp => new ApiService());
            builder.Services.AddScoped<TodosViewModel>();
            builder.Services.AddTransient<ListsViewModel>();
            builder.Services.AddSingleton<StoreService>();
            builder.Services.AddAntDesign();

            await builder.Build().RunAsync();
        }
    }
}
