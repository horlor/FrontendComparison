# FrontendComparison

This repository contains a simple todo application, created in 3 different web frontend framework: React, Blazor Webassembly,
and Svelte in order to make it possible to compare them to each other.

## Backend

The server side of this app is a simple ASP.NET Core Web Api, using Entity Framework Core to store the data. It uses JWT tokens for authentication.

## React application
This is the most used SPA framework in the world, created by Facebook. It has countless libraries to help creating maintainable projects.
In this project I used the popular React Query library to handle data come from the server, used in an MV* architecture by React hook functions.
For the UI I used Material-UI components.

## Blazor Webassembly
This newer SPA framework was created by Microsoft, and unlike most of them it isn't running in javascript, but the new Webassembly languange,
that would make us able to develop for the web more efficiently and from a strongly typed environment. In Blazor we can use C# to make our client, which will be compiled into Webassembly.
In it we can use the .NET Standards powerful library. Unfortunately it doesn't really supported in browsers now [2021. April]. A lots of code needs to be downloaded, and the
Javascript interoperability makes this app slower than an JS one.

## Svelte
Svelte is another newer SPA framework, which has a specific JS languange, unlike most other client frameworks, it does not work by using a Virtual DOM to track the modifications,
but by creating functions, to update them if the underlaying variable changes. This can make the app smaller, and faster to work. However this is a relatively new technology,
with much smaller community than React or Angular, and with much less npm modules to make our lives easier.

## Comparison
All three library has its pros and cons.
 * React is a really widespread library, with countless tutorials and libraries to help, although it has some unusual concepts which has to be learned (hooks, components, JSX).
 * Blazor uses webassembly, which tries to change the web's Javascript to a faster, typed environment. Unfortunately, from my experience, this work isn't really done,
browsers do not handle webassembly well, and much of the JS API is not available in webassembly, needing slow interops to do in order to work with it,
not to mention that webassembly standardization and implementation isn't as good as Javascript's
 * Svelte tries to create a faster and smaller application, by doing most of the work compile time. And does a good work with it, it does have a much smaller size,
 and do not have the problems of frequent DOM renders. On the other hand it does have a learning curve, it has a special syntax (not JS really, for one it uses the export keyword differently),
 the change tracking are done by watching for variable assignments. Unlike React (or Angular, or Vue) it does not have tons of learning materials or libraries (although pure JS packages can be used),
 so you could and up writing more code. In the end Svelte is an interesting idea to make web apps faster, and easier to develop, in time it can be a really popular and well-spread framework.
