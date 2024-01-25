using Microsoft.EntityFrameworkCore;
using Db.Data;
using Db.Repositories;
using Microsoft.AspNetCore.Identity;
using Api.Authentication;
using Microsoft.AspNetCore.Authentication;
using OpenIddict.Validation.AspNetCore;
using Db.Models;
using Api.Authorization;
using Microsoft.AspNetCore.Authorization;
using static System.Net.WebRequestMethods;


namespace Api
{
    public class Startup
    {
        public IConfiguration _configuration { get; }

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DatabaseContext>(
                options => options.UseSqlite(_configuration.GetConnectionString("DefaultConn"))
            );

            services.AddTransient<ProductRepository>();
            services.AddTransient<UserRepository>();
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IAuthorizationHandler, AccessHandler>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddCors();

            // este não é o melhor jeito
            services.AddDefaultIdentity<IdentityUser>(options =>
                options.SignIn.RequireConfirmedAccount = false)
                    .AddEntityFrameworkStores<DatabaseContext>();

            services.AddBackendOpenIddictServer();

            services.AddAuthentication(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)
                .AddOpenIdConnect("Bearer", options =>
                {
                    options.ClientId = "backend";
                    options.Authority = "http://localhost:5139";
                    options.RequireHttpsMetadata = false;
                })
                .AddScheme<AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>(ApiKeyAuthenticationHandler.SchemeName, null);

            services.AddAuthorization(options =>
            {
                options.AddPolicy("User", policy =>
                    policy.AddRequirements(new AccessRequirement(Access.USER)));

                options.AddPolicy("Mod", policy =>
                    policy.AddRequirements(new AccessRequirement(Access.MOD)));

                options.AddPolicy("Admin", policy =>
                    policy.AddRequirements(new AccessRequirement(Access.ADMIN)));
            });
        }
        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}