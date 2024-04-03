using Project.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdentityNum { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public List<EmployeeJobDTOforEmp> jobs { get; set; }
        public Gender Gender { get; set; }
        
    }
}
