using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Models
{
    public class EmployeeJob
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }
        public DateTime EntryDate { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public bool IsManagement { get; set; }
    }
}
