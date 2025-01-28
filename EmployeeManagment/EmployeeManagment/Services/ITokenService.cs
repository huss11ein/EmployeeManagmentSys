using EmployeeManagment.Models;

namespace EmployeeManagment.Services
{
    public interface ITokenService
    {
        string GenerateToken(ApplicationUser user);
    }
}
