using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project.Core.DTOs;
using Project.Core.Models;
using Project.Core.Servises;
using Project.Models;
using Project.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly IJobService _jobService;
        private readonly IMapper _mapper;

        public JobsController(IJobService jobService,IMapper mapper)
        {
            _jobService = jobService;
            _mapper = mapper;
        }

        // GET: api/<JobController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var jobs = await _jobService.GetListAsynk();
            return Ok(_mapper.Map<IEnumerable<JobDTO>>(jobs));
        }

        // GET api/<JobController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var job = await _jobService.GetByIdAsync(id);
            return Ok(_mapper.Map<JobDTO>(job));
        }

        // POST api/<JobController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] JobPostModel jobModel)
        {
            var newJob = await _jobService.AddAsync(_mapper.Map<Job>(jobModel));
            return Ok(_mapper.Map<JobDTO>(newJob));
        }

        // PUT api/<JobController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] JobPostModel jobModel)
        {
            var existJob = await _jobService.GetByIdAsync(id);
            if (existJob is null)
            {
                return NotFound();
            }
            await _jobService.UpdateAsync(id,_mapper.Map<Job>(jobModel));
            existJob = await _jobService.GetByIdAsync(id);
            return Ok(_mapper.Map<JobDTO>(existJob));
        }

        // DELETE api/<JobController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var job = await _jobService.GetByIdAsync(id);
            if (job is null)
            {
                return NotFound();
            }
            await _jobService.DeleteAsync(id);
            return NoContent();
        }


    }
}
