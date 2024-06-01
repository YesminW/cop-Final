using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class DailyAttendance
{
    public int DailyAttendanceId { get; set; }

    public DateTime Date { get; set; }

    public string ChildId { get; set; } = null!;

    public int MorningPresence { get; set; }

    public int AfternoonPresence { get; set; }

    public virtual Attendance AfternoonPresenceNavigation { get; set; } = null!;

    public virtual Child Child { get; set; } = null!;

    public virtual Attendance MorningPresenceNavigation { get; set; } = null!;
}
