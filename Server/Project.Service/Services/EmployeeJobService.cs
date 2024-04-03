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
    public class EmployeeJobService : IEmployeeJobService
    {
        private readonly IEmployeeJobRepository _employeeJobRepository;

        public EmployeeJobService(IEmployeeJobRepository employeeRepository)
        {
            _employeeJobRepository = employeeRepository;
        }


        public async Task<EmployeeJob> AddAsync(EmployeeJob employeeJob)
        {
           return await _employeeJobRepository.AddAsync(employeeJob);
        }

        public async Task DeleteAsync(int id)
        {
            await _employeeJobRepository.DeleteAsync(id);
        }

        public async Task<EmployeeJob> GetByIdAsync(int id)
        {
            return await _employeeJobRepository.GetByIdAsync(id);
        }

        public async Task<List<EmployeeJob>> GetListAsynk()
        {
            return await _employeeJobRepository.GetListAsynk();
        }

        public async Task<EmployeeJob> UpdateAsync(int id, EmployeeJob employeeJob)
        {
            return await _employeeJobRepository.UpdateAsync(id,employeeJob);
        }
    }
}
