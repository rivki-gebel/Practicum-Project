using Project.Core.Models;

namespace Project.Models
{
    public class EmployeeJobPostModel
    {
        public int JobId { get; set; }
        public DateTime EntryDate { get; set; }
        public int EmployeeId { get; set; }
        public bool IsManagement { get; set; }

    }
}
