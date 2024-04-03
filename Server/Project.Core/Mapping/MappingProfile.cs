using AutoMapper;
using Project.Core.DTOs;
using Project.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<EmployeeJob, EmployeeJobDTOforEmp>().ReverseMap();
            CreateMap<EmployeeJob, EmployeeJobDTOown>().ReverseMap();
            CreateMap<Job, JobDTO>().ReverseMap();
        }
    }
}
