using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project.Core.DTOs;
using Project.Core.Models;
using Project.Core.Servises;
using Project.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper= mapper;
        }

        // GET: api/<EmloyeeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employees = await _employeeService.GetListAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDTO>>(employees.Where(e=>e.ActivityStatus)));
        }

        // GET api/<EmloyeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var employee= await _employeeService.GetByIdAsync(id);
            if (employee == null || !employee.ActivityStatus)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<EmployeeDTO>(employee));

        }

        // POST api/<EmloyeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employeeModel)
        {
            var newEmployee = await _employeeService.AddAsync(_mapper.Map<Employee>(employeeModel));
            return Ok(_mapper.Map<EmployeeDTO>(newEmployee));
        }

        // PUT api/<EmloyeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employeeModel)
        {
            var existEmployee = await _employeeService.GetByIdAsync(id);
            if (existEmployee is null || ! existEmployee.ActivityStatus)
            {
                return NotFound();
            }
            await _employeeService.UpdateAsync(id,_mapper.Map<Employee>(employeeModel));
            existEmployee = await _employeeService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDTO>(existEmployee));
        }

        // DELETE api/<EmloyeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
           var employee= await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            await _employeeService.DeleteAsync(id);
            return NoContent();
        }
        // DELETE api/<EmloyeeController>/virtual/5
        [HttpDelete("virtual/{id}")]
        public async Task<ActionResult> VirtualDelete(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            await _employeeService.VirtualDeleteAsync(id);
            return NoContent();
        }
    }
}
