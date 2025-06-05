using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly AppDbContext _context;

    public JobsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Job>> GetJobs()
    {
        return _context.Jobs.ToList();
    }

    [HttpPost]
    public IActionResult AddJob(Job job)
    {
        _context.Jobs.Add(job);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetJobs), new { id = job.Id }, job);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateJob(int id, [FromBody] Job updatedJob)
    {
        var job = _context.Jobs.Find(id);
        if (job == null)
        {
            return NotFound();
        }

        job.Title = updatedJob.Title;
        job.Company = updatedJob.Company;
        job.Location = updatedJob.Location;
        job.Url = updatedJob.Url;
        job.Description = updatedJob.Description;
        job.Status = updatedJob.Status;
        job.DateSaved = updatedJob.DateSaved;

        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteJob(int id)
    {
        var job = _context.Jobs.Find(id);
        if (job == null)
        {
            return NotFound();
        }

        _context.Jobs.Remove(job);
        _context.SaveChanges();
        return NoContent();
    }
}

