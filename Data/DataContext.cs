using DockerProject.Models;
using Microsoft.EntityFrameworkCore;

namespace DockerProject.Data;

public class DataContext(DbContextOptions<DataContext> options)  : DbContext(options)
{
    public DbSet<Student> Students { get; set; }
}