
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project.Core.Models;
using Project.Core.Servises;
using Project.Core.DTOs;
using Project.Service.Services;
using System.Globalization;
using Project.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeJobController : ControllerBase
    {
        private readonly IEmployeeJobService _employeeJobService;
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeeJobController(IEmployeeJobService employeeJobService, IEmployeeService employeeService,IMapper mapper)
        {
            _employeeJobService = employeeJobService;
            _employeeService = employeeService;
            _mapper = mapper;
        }


        // GET: api/<EmployeeJobController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employeesJobs = await _employeeJobService.GetListAsynk();
            return Ok(_mapper.Map<IEnumerable<EmployeeJobDTOown>>(employeesJobs));
        }

        // GET api/<EmployeeJobController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var employeeJob = await _employeeJobService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeJobDTOown>(employeeJob));
        }

        // POST api/<EmployeeJobController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeeJobPostModel employeeJobModel)
        {
            //employeeJob.EntryDate = new DateOnly(employeeJob.EntryDate.Year, employeeJob.EntryDate.Month, employeeJob.EntryDate.Day);
            var newEmployeeJob = await _employeeJobService.AddAsync(_mapper.Map<EmployeeJob>(employeeJobModel));
            var employee = await _employeeService.GetByIdAsync(employeeJobModel.EmployeeId);
            employee.jobs.Add(newEmployeeJob);
            return Ok(_mapper.Map<EmployeeJobDTOown>(newEmployeeJob));
        }

        // PUT api/<EmployeeJobController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeeJobPostModel employeeJobModel)
        {
            var existEmployeeJob = await _employeeJobService.GetByIdAsync(id);
            if (existEmployeeJob is null)
            {
                return NotFound();
            }
            await _employeeJobService.UpdateAsync(id, _mapper.Map<EmployeeJob>(employeeJobModel));
            existEmployeeJob = await _employeeJobService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeJobDTOown>(existEmployeeJob));
        }

        // DELETE api/<EmployeeJobController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employeeJob = await _employeeJobService.GetByIdAsync(id);
            if (employeeJob is null)
            {
                return NotFound();
            }
           var employee= await _employeeService.GetByIdAsync(employeeJob.Employee.Id);
            await _employeeJobService.DeleteAsync(id);
            return NoContent();
        }
    }
}
