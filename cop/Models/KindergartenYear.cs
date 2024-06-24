using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cop.Models
{
    public class KindergartenYear
    {
        public int KindergartenYearId { get; set; }
        public int CurrentAcademicYear { get; set; }
        public int KindergartenNumber { get; set; }

        public virtual Kindergarten? KindergartenNumberNavigation { get; set; }
        public virtual ICollection<Parent> Parents { get; set; } = new List<Parent>();
        public virtual ICollection<StaffMember> StaffMembers { get; set; } = new List<StaffMember>();
    }
}
