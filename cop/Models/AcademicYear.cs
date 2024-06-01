using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class AcademicYear
{
    public int CurrentAcademicYear { get; set; }

    public virtual ICollection<DaySummary> DaySummaries { get; set; } = new List<DaySummary>();

    public virtual ICollection<Duty> Duties { get; set; } = new List<Duty>();

    public virtual ICollection<RegisterdTo> RegisterdTos { get; set; } = new List<RegisterdTo>();

    public virtual ICollection<UserInKindergarten> UserInKindergartens { get; set; } = new List<UserInKindergarten>();

    public virtual ICollection<Kindergarten> KindergartenNumbers { get; set; } = new List<Kindergarten>();
}
