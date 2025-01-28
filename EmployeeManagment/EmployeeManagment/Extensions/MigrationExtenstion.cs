using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Writers;
using EmployeeManagment.Data;

namespace EmployeeManagment.Extensions
{
    public static class MigrationExtenstion
    {
        public static void ApplyMigrations(this IApplicationBuilder app) {
            using IServiceScope scope  = app.ApplicationServices.CreateScope();
            using ApplicationDbContext dbcontext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            dbcontext.Database.Migrate();
        
        }
    }
}
