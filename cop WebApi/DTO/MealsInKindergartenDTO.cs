using cop.Models;

namespace Co_p_new__WebApi.DTO
{
    public class MealsInKindergartenDTO
    {
        public DateTime ActivityDate { get; set; }
        public string KindergartenName { get; set; } = null!;
        public string MaelName { get; set; } = null!;
        public string MealDetails { get; set; } = null!;


        public virtual Meal? MealNumberNavigation { get; set; }


        public virtual Kindergarten KindergartenNumberNavigation { get; set; } = null!;

    }
}