using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace BlazorApp.Services
{
    public static class HttpClientExtensions
    {
        public static async Task<TResult> PutWithJsonAsync<TResult, TParam>(this HttpClient httpClient, string uri, TParam param)
        {
            var result = await httpClient.PutAsJsonAsync(uri, param);
            if (result.IsSuccessStatusCode)
            {
                return await result.Content.ReadFromJsonAsync<TResult>();
            }
            else
            {
                throw new Exception();
            }
        }

        public static async Task<TResult> PostWithJsonAsync<TResult, TParam>(this HttpClient httpClient, string uri, TParam param)
        {
            var result = await httpClient.PostAsJsonAsync(uri, param);
            if (result.IsSuccessStatusCode)
            {
                return await result.Content.ReadFromJsonAsync<TResult>();
            }
            else
            {
                throw new Exception();
            }
        }
    }
}
