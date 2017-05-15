using CrudApp.Data;
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
using Microsoft.AspNetCore.HttpOverrides;
using System;

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

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SecurityDBContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("SecurityConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<SecurityDBContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(option =>
            {
                option.Cookies.ApplicationCookie.LoginPath =
                new PathString("/account/login");
            });

            services.AddMvc();

            if (Convert.ToBoolean(Configuration["UseFake"]))
                services.AddSingleton<IObjectives, FakeObjectives>();
            else
                services.AddTransient<IObjectives, Objectives>();

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
