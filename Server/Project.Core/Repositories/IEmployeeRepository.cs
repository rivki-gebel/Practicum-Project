using Project.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Repositories
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetListAsync();
        Task<Employee> GetByIdAsync(int id);

        Task<Employee> AddAsync(Employee employee);

        Task<Employee> UpdateAsync(int id,Employee employee);

        Task DeleteAsync(int id);
        Task VirtualDeleteAsync(int id);
    }
}
