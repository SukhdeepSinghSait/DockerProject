using DockerProject.Data;
using DockerProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DockerProject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public StudentController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        // Create
        [HttpPost]
        public async Task<ActionResult> CreateStudents([FromBody] List<Student> students)
        {
            if (students == null || students.Count == 0)
            {
                return BadRequest(new { message = "No students provided." });
            }

            foreach (var student in students)
            {
                if (await _dataContext.Students.AnyAsync(s => s.StudentId == student.StudentId))
                {
                    return Conflict(new { message = $"Student with ID {student.StudentId} already exists." });
                }
                _dataContext.Students.Add(student);
            }

            await _dataContext.SaveChangesAsync();
            return Ok(new { message = "Students created successfully.", data = students });
        }

        // Read All
        [HttpGet()]
        public async Task<ActionResult<List<Student>>> GetStudents()
        {
            return await _dataContext.Students.ToListAsync();
        }

        // Read by ID
        [HttpGet("{id}")]
        public async Task<ActionResult> GetStudentById(int id)
        {
            var student = await _dataContext.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound(new { message = "Student not found." });
            }
            return Ok(new { message = "Student found.", data = student });
        }

        // Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student student)
        {
            if (id != student.StudentId)
            {
                return BadRequest(new { message = "Student ID mismatch." });
            }

            var existingStudent = await _dataContext.Students.FindAsync(id);
            if (existingStudent == null)
            {
                return NotFound(new { message = "Student not found." });
            }

            existingStudent.StudentId = student.StudentId;
            existingStudent.StudentName = student.StudentName;
            existingStudent.Course = student.Course;
            existingStudent.PresentDate = student.PresentDate;

            try
            {
                await _dataContext.SaveChangesAsync();
                return Ok(new { message = "Student updated successfully.", data = existingStudent });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound(new { message = "Student not found." });
                }
                else
                {
                    throw;
                }
            }
        }

        // Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _dataContext.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound(new { message = "Student not exists." });
            }

            _dataContext.Students.Remove(student);
            await _dataContext.SaveChangesAsync();

            return Ok(new { message = "Student deleted successfully." });
        }

        private bool StudentExists(int id)
        {
            return _dataContext.Students.Any(e => e.StudentId == id);
        }
    }
}