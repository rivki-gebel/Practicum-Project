using Project.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Servises
{
    public interface IJobService
    {
        Task<List<Job>> GetListAsynk();
        Task<Job> GetByIdAsync(int id);
        Task<Job> AddAsync(Job job);

        Task<Job> UpdateAsync(int id,Job job);

        Task DeleteAsync(int id);
    }
}
