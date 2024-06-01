using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class ActivityType
{
    public int ActivityNumber { get; set; }

    public string ActivityName { get; set; } = null!;

    public virtual ICollection<ActualActivity> ActualActivities { get; set; } = new List<ActualActivity>();
}
