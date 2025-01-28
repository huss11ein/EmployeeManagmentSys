using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;
using EmployeeManagment.Data;
using EmployeeManagment.Models;
using EmployeeManagment.Services;

namespace TeleperformanceTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IFileService _fileService;

        public EmployeesController(IFileService fileService, ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _fileService = fileService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var employeeList = new List<Employee>();

            if (User.IsInRole("ADMIN"))
            {
                employeeList = await _dbContext.Employees.ToListAsync();
            }
            else
            {
                employeeList = await _dbContext.Employees.Where(emp => emp.UserId == currentUserId).ToListAsync();
            }

            return Ok(employeeList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var employeeRecord = await _dbContext.Employees.FindAsync(id);

            if (employeeRecord == null)
                return NotFound();

            if (employeeRecord.UserId != currentUserId && !User.IsInRole("ADMIN"))
                return Forbid();

            return Ok(employeeRecord);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromForm] Employee newEmployee)
        {
            try
            {
                var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (!User.IsInRole("ADMIN") && newEmployee.UserId != currentUserId)
                    return Forbid();

                if (newEmployee.ImagePath == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "Employee must contain an image.");
                }

                string[] allowedExtensions = [".jpg", ".jpeg", ".png"];
                string imageFileName = await _fileService.SaveFileAsync(newEmployee.ImagePath, allowedExtensions);
                newEmployee.EmployeeImage = imageFileName;

                _dbContext.Employees.Add(newEmployee);
                await _dbContext.SaveChangesAsync();
                return CreatedAtAction(nameof(GetEmployee), new { id = newEmployee.Id }, newEmployee);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromForm] Employee updatedEmployee)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existingEmployeeRecord = await _dbContext.Employees.FindAsync(id);

            if (existingEmployeeRecord == null)
                return NotFound();

            if (existingEmployeeRecord.UserId != currentUserId && !User.IsInRole("ADMIN"))
                return Forbid();

            string previousImage = existingEmployeeRecord.EmployeeImage;

            if (updatedEmployee.ImagePath != null)
            {
                string[] allowedExtensions = [".jpg", ".jpeg", ".png"];
                string newImageFileName = await _fileService.SaveFileAsync(updatedEmployee.ImagePath, allowedExtensions);
                updatedEmployee.EmployeeImage = newImageFileName;
            }

            existingEmployeeRecord.UserName = updatedEmployee.UserName;
            existingEmployeeRecord.Email = updatedEmployee.Email;
            existingEmployeeRecord.PhoneNumber = updatedEmployee.PhoneNumber;
            existingEmployeeRecord.EducationLevel = updatedEmployee.EducationLevel;
            existingEmployeeRecord.EmployeeImage = updatedEmployee.EmployeeImage;

            _dbContext.Entry(existingEmployeeRecord).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            if (updatedEmployee.ImagePath != null)
                _fileService.DeleteFile(previousImage);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var employeeRecord = await _dbContext.Employees.FindAsync(id);

            if (employeeRecord == null)
                return NotFound();

            if (employeeRecord.UserId != currentUserId && !User.IsInRole("ADMIN"))
                return Forbid();

            _dbContext.Employees.Remove(employeeRecord);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
