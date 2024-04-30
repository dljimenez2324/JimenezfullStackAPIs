using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        // add this private variable which wont be mutated hence read only and private
        private readonly AppDbContext _context;
        // now  we crate a contstructor that passes in a parameter
        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        
        public async Task<IEnumerable<Student>> getStudent()
        {
            var students = await _context.Students.AsNoTracking().ToListAsync();
            return students;
        }
        
        // now our first post 
        [HttpPost]

        public async Task<IActionResult> Create(Student student)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.AddAsync(student);

            var result = await _context.SaveChangesAsync();

            if(result > 0)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}