using Microsoft.AspNetCore.Identity;

namespace EmployeeManagment.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Role { get; set; }

    }
}
