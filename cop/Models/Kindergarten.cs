using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class Kindergarten
{
    public int KindergartenNumber { get; set; }

    public string KindergartenName { get; set; } = null!;

    public string? KindergartenAddress { get; set; }

    public virtual ICollection<ActualActivity> ActualActivities { get; set; } = new List<ActualActivity>();

    public virtual ICollection<DaySummary> DaySummaries { get; set; } = new List<DaySummary>();

    public virtual ICollection<Duty> Duties { get; set; } = new List<Duty>();

    public virtual ICollection<Photo> Photos { get; set; } = new List<Photo>();

    public virtual ICollection<RegisterdTo> RegisterdTos { get; set; } = new List<RegisterdTo>();

    public virtual ICollection<StaffMember> StaffMembers { get; set; } = new List<StaffMember>();

    public virtual ICollection<UserInKindergarten> UserInKindergartens { get; set; } = new List<UserInKindergarten>();

    public virtual ICollection<AcademicYear> CurrentAcademicYears { get; set; } = new List<AcademicYear>();

    public virtual ICollection<Meal> MealNumbers { get; set; } = new List<Meal>();
}
