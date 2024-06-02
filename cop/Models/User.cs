using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class User
{
    public string UserId { get; set; } = null!;

    public string UserPrivetName { get; set; } = null!;

    public string UserSurname { get; set; } = null!;

    public DateTime? UserBirthDate { get; set; }

    public string? UserAddress { get; set; }

    public string UserPhoneNumber { get; set; } = null!;

    public string? UserGender { get; set; }

    public string? UserEmail { get; set; }

    public string UserpPassword { get; set; } = null!;

    public int UserCode { get; set; }
    public string? UserPhotoName { get; set; }


    public virtual Parent? Parent { get; set; }

    public virtual StaffMember? StaffMember { get; set; }

    public virtual ICollection<UserInKindergarten> UserInKindergartens { get; set; } = new List<UserInKindergarten>();

    public virtual ICollection<Interest> InterestsNumbers { get; set; } = new List<Interest>();

}
