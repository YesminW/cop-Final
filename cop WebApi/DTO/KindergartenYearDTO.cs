using cop.Models;

namespace Co_p_new__WebApi.DTO
{
    public class KindergartenYearDTO
    {
        public int CurrentAcademicYear { get; set; }
        public int KindergartenNumber { get; set; }

        public virtual Kindergarten? KindergartenNumberNavigation { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}