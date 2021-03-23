using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace BlazorApp.Models
{
    public class Error
    {
        public string Title { get; set; }
        public string Message { get; set; }

        public static Error FromException(HttpRequestException e)
        {
            Error Error;
            switch (e.StatusCode)
            {
                case HttpStatusCode.Unauthorized:
                    Error = new Error()
                    {
                        Title = "Authentication failure",
                        Message = "Please login to access this page."
                    };
                    break;
                case HttpStatusCode.Forbidden:
                    Error = new Error()
                    {
                        Title = "Access failure",
                        Message = "You don't have the rights to access this information."
                    };
                    break;
                case HttpStatusCode.NotFound:
                    Error = new Error()
                    {
                        Title = "Resource not found",
                        Message = "The given resource is not existing on the server."
                    };
                    break;
                case HttpStatusCode.Conflict:
                    Error = new Error()
                    {
                        Title = "Data process error",
                        Message = "The data sent to the server is not valid, or it is malformed."
                    };
                    break;
                case HttpStatusCode.BadRequest:
                    Error = new Error()
                    {
                        Title = "Faulty request",
                        Message = "The server could not handle your request."
                    };
                    break;
                case HttpStatusCode.InternalServerError:
                    Error = new Error()
                    {
                        Title = "Serverside error",
                        Message = $"An error occured on the remote server, that it could not handle, please try it later, or contact your administrator.\nMessage:{e.Message}"
                    };
                    break;
                default:
                    Error = new Error()
                    {
                        Title = "Unexpected error",
                        Message = $"The application recieved an unexpected error, please contact your administrator:\nMessage:{e.Message}"
                    };
                    break;
            }
            return Error;
        }
    }
}
