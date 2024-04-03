using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Models
{
    
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdentityNum { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public List<EmployeeJob> jobs { get; set; }
        public Gender Gender { get; set; }
        public bool ActivityStatus { get; set; } = true;




    }
    public enum Gender
    {
        male=1,
        female
    }
}
