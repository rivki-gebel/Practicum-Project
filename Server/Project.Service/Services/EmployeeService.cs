using Project.Core.Models;
using Project.Core.Repositories;
using Project.Core.Servises;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            return await _employeeRepository.AddAsync(employee);
        }

        public async Task DeleteAsync(int id)
        {
            await _employeeRepository.DeleteAsync(id);
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _employeeRepository.GetByIdAsync(id);
        }

        public async Task<List<Employee>> GetListAsync()
        {
           return await _employeeRepository.GetListAsync();
        }

        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            return await _employeeRepository.UpdateAsync(id, employee); 
        }

        public async Task VirtualDeleteAsync(int id)
        {
            await _employeeRepository.VirtualDeleteAsync(id);
        }
    }
}
