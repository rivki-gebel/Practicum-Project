using Microsoft.EntityFrameworkCore;
using Project.Core.Models;
using Project.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task DeleteAsync(int id)
        {
            var employee=await GetByIdAsync(id);
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _context.Employees.Include(e => e.jobs).ThenInclude(j=>j.Job).FirstAsync(x => x.Id == id);
        }

        public async Task<List<Employee>> GetListAsync()
        {
            return await _context.Employees.Include(e=>e.jobs).ThenInclude(j => j.Job).ToListAsync();
        }
     
        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            var existEmployee= await GetByIdAsync(id);
            existEmployee.BirthDate= employee.BirthDate;
            existEmployee.FirstName= employee.FirstName;
            existEmployee.LastName= employee.LastName;
            existEmployee.StartDate= employee.StartDate;    
            existEmployee.IdentityNum= employee.IdentityNum;
            existEmployee.Gender= employee.Gender;
                        
            await _context.SaveChangesAsync();
            return existEmployee;
        }

        public async Task VirtualDeleteAsync(int id)
        {
            var employee = await GetByIdAsync(id);
            employee.ActivityStatus = false;
            await _context.SaveChangesAsync();
            
        }
    }
}
