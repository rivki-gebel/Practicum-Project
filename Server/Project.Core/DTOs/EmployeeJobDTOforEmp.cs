using Project.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.DTOs
{
    public class EmployeeJobDTOforEmp
    {
        public int Id { get; set; }
        public JobDTO Job { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsManagement { get; set; }


    }
}
