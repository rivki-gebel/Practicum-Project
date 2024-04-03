using Project.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Servises
{
    public interface IEmployeeJobService
    {
        Task<List<EmployeeJob>> GetListAsynk();
        Task<EmployeeJob> GetByIdAsync(int id);
        Task<EmployeeJob> AddAsync(EmployeeJob employeeJob);

        Task<EmployeeJob> UpdateAsync(int id, EmployeeJob employeeJob);

        Task DeleteAsync(int id);
    }
}
