namespace DockerProject.Models;

    public class Student
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; } = null!;
        public string Course {  get; set; } = null!;
        public string PresentDate { get; set; } = null!;
        
    }
