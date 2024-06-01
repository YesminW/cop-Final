using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class UserInKindergarten
{
    public DateTime? StartDate { get; set; }

    public int CurrentAcademicYear { get; set; }

    public int KindergartenNumber { get; set; }

    public string UserId { get; set; } = null!;

    public virtual AcademicYear CurrentAcademicYearNavigation { get; set; } = null!;

    public virtual Kindergarten KindergartenNumberNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
