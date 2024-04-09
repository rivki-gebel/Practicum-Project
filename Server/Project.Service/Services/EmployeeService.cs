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
            if (!IsValidEmployeeId(employee.IdentityNum))
                throw new Exception("Invalid employee data.");
            if (IsDuplicateEmployeeId(employee.IdentityNum))
                throw new Exception("Employee width the same identity number already exists");
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

        private bool IsValidEmployeeId(string identityNum)
        {
            return !string.IsNullOrEmpty(identityNum) && identityNum.Length == 9 && int.TryParse(identityNum, out _);
        }
        private bool IsDuplicateEmployeeId(string identityNum)
        {
            var existingEmployee =  _employeeRepository.GetListAsync().Result.FirstOrDefault(e => e.IdentityNum == identityNum);
            return existingEmployee != null && existingEmployee.ActivityStatus==true;
        }
    }
       
}
