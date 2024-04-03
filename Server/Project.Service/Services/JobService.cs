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
    public class JobService : IJobService
    {
        private readonly IJobRepository _jobRepository;

        public JobService(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }
        public async Task<Job> AddAsync(Job job)
        {
            return await _jobRepository.AddAsync(job);  
        }

        public async Task DeleteAsync(int id)
        {
             await _jobRepository.DeleteAsync(id);
        }

        public async Task<Job> GetByIdAsync(int id)
        {
            return await _jobRepository.GetByIdAsync(id);
        }

        public async Task<List<Job>> GetListAsynk()
        {
            return await _jobRepository.GetListAsynk();
        }

        public async Task<Job> UpdateAsync(int id,Job job)
        {
            return await _jobRepository.UpdateAsync(id,job);
        }
    }
}
