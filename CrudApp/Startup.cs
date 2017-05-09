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

namespace CrudApp
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

        if (env.IsDevelopment())
            {
               // builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();
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
                new PathString("/pages/account/login");
            });

            services.AddMvc();

            services.AddSingleton<IObjectives, FakeObjectives>();
        }

        public IConfigurationRoot Configuration { get; }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseIdentity();

            app.UseMvc(routers =>
            {
                routers.MapRoute(
                    name: "default",
                    template: "pages/{controller=Default}/{action=Index}");
            });
        }
    }
}
