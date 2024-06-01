using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class Meal
{
    public int MealNumber { get; set; }

    public string MealType { get; set; } = null!;

    public string MealDetails { get; set; } = null!;

    public virtual ICollection<ActualActivity> ActualActivities { get; set; } = new List<ActualActivity>();

    public virtual ICollection<Kindergarten> KindergartenNumbers { get; set; } = new List<Kindergarten>();
}
