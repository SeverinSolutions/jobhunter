using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Job
{
    // Basic Info
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "Saved";
    public DateTime DateSaved { get; set; } = DateTime.UtcNow;

    // Recruiter Info
    public string RecruiterName { get; set; } = string.Empty;
    public string RecruiterEmail { get; set; } = string.Empty;
    public string RecruiterPhone { get; set; } = string.Empty;

    // Additional Data
    [Column(TypeName = "jsonb")]
    public List<string> Notes { get; set; } = [];

    [Column(TypeName = "jsonb")]
    public List<string> Skills { get; set; } = [];
}

