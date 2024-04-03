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
    public class EmployeeJobRepository : IEmployeeJobRepository
    {
        private readonly DataContext _context;

        public EmployeeJobRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<EmployeeJob> AddAsync(EmployeeJob employeeJob)
        {
            _context.EmployeeJobs.Add(employeeJob);
            await _context.SaveChangesAsync();
            return employeeJob;
        }

        public async Task DeleteAsync(int id)
        {
           var employeeJob= await GetByIdAsync(id);
            _context.EmployeeJobs.Remove(employeeJob);
           await _context.SaveChangesAsync();
        }

        public async Task<EmployeeJob> GetByIdAsync(int id)
        {
           var x= await _context.EmployeeJobs.Include(ej => ej.Job).Include(ej=>ej.Employee).FirstAsync(e=>e.Id==id);
            return x;
        }

        public async Task<List<EmployeeJob>> GetListAsynk()
        {
            return await _context.EmployeeJobs.Include(ej=>ej.Job).Include(ej => ej.Employee).ToListAsync();
            
        }

        public async Task<EmployeeJob> UpdateAsync(int id, EmployeeJob employeeJob)
        {
            var existEmployeeJob=await GetByIdAsync(id);
            existEmployeeJob.EntryDate=employeeJob.EntryDate;
            existEmployeeJob.JobId= employeeJob.JobId;
            existEmployeeJob.EmployeeId=employeeJob.EmployeeId;
            //_context.Entry(existEmployeeJob).CurrentValues.SetValues(employeeJob);
            await _context.SaveChangesAsync();
            return existEmployeeJob;    
        }
    }
}
