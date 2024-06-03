using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class RegisterdTo
{
    public int CurrentAcademicYear { get; set; }

    public string ChildId { get; set; } = null!;

    public int KindergartenNumber { get; set; }

    public virtual Child Child { get; set; } = null!;

    public virtual AcademicYear CurrentAcademicYearNavigation { get; set; } = null!;

    public virtual Kindergarten KindergartenNumberNavigation { get; set; } = null!;
}
                                                                                                                                                                                                        