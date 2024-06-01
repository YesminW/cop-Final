using cop.Models;
using Co_p_new__WebApi.DTO;


namespace Co_p_new__WebApi.DTO
{
    public class StaffInKindergartenDTO
    {
        public string KindergartenName { get; set; } = null!;
        public int KindergartenNumber { get; set; }

        public string UserPrivetName { get; set; } = null!;

        public string UserSurname { get; set; } = null!;
        public int UserCode { get; set; }
    }
}