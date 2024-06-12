using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace cop.Models;

public partial class User
{
    [JsonPropertyName("UserId")]
    public string UserId { get; set; } = null!;

    [JsonPropertyName("UserPrivetName")]
    public string UserPrivetName { get; set; } = null!;

    [JsonPropertyName("UserSurname")]
    public string UserSurname { get; set; } = null!;

    [JsonPropertyName("UserBirthDate")]
    public DateTime? UserBirthDate { get; set; }

    [JsonPropertyName("UserAddress")]
    public string? UserAddress { get; set; }

    [JsonPropertyName("UserPhoneNumber")]
    public string UserPhoneNumber { get; set; } = null!;

    [JsonPropertyName("UserGender")]
    public string? UserGender { get; set; }

    [JsonPropertyName("UserEmail")]
    public string? UserEmail { get; set; }
    [JsonPropertyName("UserpPassword")]
    public string UserpPassword { get; set; } = null!;

    [JsonPropertyName("UserCode")]
    public int UserCode { get; set; }

    [JsonPropertyName("UserPhotoName")]
    public string? UserPhotoName { get; set; }

    [JsonPropertyName("Parent")]
    public virtual Parent? Parent { get; set; }

    [JsonPropertyName("StaffMember")]
    public virtual StaffMember? StaffMember { get; set; }

    [JsonPropertyName("UserInKindergartens")]
    public virtual ICollection<UserInKindergarten> UserInKindergartens { get; set; } = new List<UserInKindergarten>();

    [JsonPropertyName("InterestsNumbers")]
    public virtual ICollection<Interest> InterestsNumbers { get; set; } = new List<Interest>();


}
