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
    public class JobRepository : IJobRepository
    {
        private readonly DataContext _context;

        public JobRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Job> AddAsync(Job job)
        {
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();
            return job;
        }

        public async Task DeleteAsync(int id)
        {
            var job = await GetByIdAsync(id);
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
        }

        public async Task<Job> GetByIdAsync(int id)
        {
            return await _context.Jobs.FirstAsync(x => x.Id == id);
        }

        public async Task<List<Job>> GetListAsynk()
        {
            return await _context.Jobs.ToListAsync();
        }

        public async Task<Job> UpdateAsync(int id,Job job)
        {
            var existJob = await GetByIdAsync(id);
            existJob.Name= job.Name;
            //_context.Entry(existJob).CurrentValues.SetValues(job);
            await _context.SaveChangesAsync();
            return existJob;
        }
    }
}
