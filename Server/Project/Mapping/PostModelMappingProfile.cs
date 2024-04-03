using AutoMapper;
using Project.Core.Models;
using Project.Models;

namespace Project.Mapping
{
    public class PostModelMappingProfile:Profile
    {
        public PostModelMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>();
            CreateMap<EmployeeJobPostModel, EmployeeJob>();
            CreateMap<JobPostModel, Job>();
        }
    }
}
