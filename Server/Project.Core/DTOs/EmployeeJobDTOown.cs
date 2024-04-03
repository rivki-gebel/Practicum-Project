using Project.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.DTOs
{
    public class EmployeeJobDTOown
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public DateTime EntryDate { get; set; }
        public int EmployeeId { get; set; }
        public bool IsManagement { get; set; }

    }
}
