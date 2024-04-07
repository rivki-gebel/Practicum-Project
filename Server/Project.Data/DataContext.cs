using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Project.Core.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Data
{

    public class DataContext:DbContext
    {
        private readonly IConfiguration _configuration;
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<EmployeeJob> EmployeeJobs { get; set; }
        public DataContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration["DbConnectionString"]);
            optionsBuilder.LogTo((message) => Debug.Write(message));
        }

        
    }
}
