﻿using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManagment.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string EducationLevel { get; set; }
        [NotMapped]
        public IFormFile? ImagePath { get; set; }
        public string? EmployeeImage { get; set; }
        public string UserId { get; set; }
        public virtual ApplicationUser? User { get; set; }
    }
}
