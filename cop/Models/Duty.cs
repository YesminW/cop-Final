﻿using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class Duty
{
    public DateTime DutyDate { get; set; }

    public string Child1 { get; set; } = null!;

    public string Child2 { get; set; } = null!;

    public int CurrentAcademicYear { get; set; }

    public int KindergartenNumber { get; set; }

    public virtual Child Child1Navigation { get; set; } = null!;

    public virtual Child Child2Navigation { get; set; } = null!;

    public virtual AcademicYear CurrentAcademicYearNavigation { get; set; } = null!;

    public virtual Kindergarten KindergartenNumberNavigation { get; set; } = null!;
}
