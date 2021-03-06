﻿using CrudApp.Data;
using CrudApp.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using TestSite02.AbstractModel;
using TestSite02.FaketModel;
using CrudApp.Model;
using CrudApp.Service.Email;
using Microsoft.AspNetCore.HttpOverrides;
using System.IO;

namespace CrudApp
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            if (env.IsDevelopment())
            {
                builder.AddJsonFile("C:\\pass\\loginPass.json");
            }

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SecurityDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("SecurityConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>(config =>
            {
                config.SignIn.RequireConfirmedEmail = true;
                config.Cookies.ApplicationCookie.LoginPath =
                    new PathString("/account/login");
            }).AddEntityFrameworkStores<SecurityDBContext>()
              .AddDefaultTokenProviders();

            services.AddMvc();

            services.AddTransient<IObjectives, Objectives>();

            var login = new EmailLoginFrom()
            {
                Login = Configuration["EmailLogin"],
                Password = Configuration["EmailPassword"]
            };

            services.AddSingleton<IEmailSender, EmailSender>(factory =>
            {
                return new EmailSender(login);
            });

            services.AddDbContext<CrudDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("CrudDbConnection")));
        }

        public IConfigurationRoot Configuration { get; }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            loggerFactory.AddConsole();
            loggerFactory.AddDebug();

            app.UseDeveloperExceptionPage();

            app.UseStaticFiles();

            app.UseIdentity();

            app.UseMvc(routers =>
            {
                routers.MapRoute(
                    name: "Default",
                    template: "{controller=Default}/{action=Index}");
            });
        }
    }
}