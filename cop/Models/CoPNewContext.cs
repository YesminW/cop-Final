using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace cop.Models;

public partial class CoPNewContext : DbContext
{
    public CoPNewContext()
    {
    }

    public CoPNewContext(DbContextOptions<CoPNewContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AcademicYear> AcademicYears { get; set; }

    public virtual DbSet<ActivityType> ActivityTypes { get; set; }

    public virtual DbSet<ActualActivity> ActualActivities { get; set; }

    public virtual DbSet<Attendance> Attendances { get; set; }

    public virtual DbSet<Child> Children { get; set; }

    public virtual DbSet<DailyAttendance> DailyAttendances { get; set; }

    public virtual DbSet<DaySummary> DaySummaries { get; set; }

    public virtual DbSet<DiagnosedWith> DiagnosedWiths { get; set; }

    public virtual DbSet<Duty> Duties { get; set; }

    public virtual DbSet<HealthProblem> HealthProblems { get; set; }

    public virtual DbSet<Interest> Interests { get; set; }

    public virtual DbSet<Kindergarten> Kindergartens { get; set; }

    public virtual DbSet<Meal> Meals { get; set; }

    public virtual DbSet<Parent> Parents { get; set; }

    public virtual DbSet<Photo> Photos { get; set; }

    public virtual DbSet<RegisterdTo> RegisterdTos { get; set; }

    public virtual DbSet<StaffMember> StaffMembers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserInKindergarten> UserInKindergartens { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var config = new ConfigurationBuilder().AddJsonFile("appsettings.json", false).Build();
        String connStr = config.GetConnectionString("DefaultConnectionString");
        optionsBuilder.UseSqlServer(connStr);
    }
    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //{
    //    optionsBuilder.UseSqlServer("Server= DESKTOP-P7N05EA\\SQLEXPRESS;Database=Co-p new;Trusted_Connection=True;Encrypt=false");
    //}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AcademicYear>(entity =>
        {
            entity.HasKey(e => e.CurrentAcademicYear).HasName("PK__Academic__7E471AD389BDDB7A");

            entity.ToTable("Academic Year");

            entity.Property(e => e.CurrentAcademicYear).ValueGeneratedNever();

            entity.HasMany(d => d.KindergartenNumbers).WithMany(p => p.CurrentAcademicYears)
                .UsingEntity<Dictionary<string, object>>(
                    "KindergartenYear",
                    r => r.HasOne<Kindergarten>().WithMany()
                        .HasForeignKey("KindergartenNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Kindergar__Kinde__6A30C649"),
                    l => l.HasOne<AcademicYear>().WithMany()
                        .HasForeignKey("CurrentAcademicYear")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Kindergar__Curre__693CA210"),
                    j =>
                    {
                        j.HasKey("CurrentAcademicYear", "KindergartenNumber").HasName("PK__Kinderga__8779E3CA4F38CE9F");
                        j.ToTable("Kindergarten Year");
                    });
        });

        modelBuilder.Entity<ActivityType>(entity =>
        {
            entity.HasKey(e => e.ActivityNumber).HasName("PK__Activity__CA8A561251FEF67F");

            entity.ToTable("Activity Type");

            entity.Property(e => e.ActivityName).HasMaxLength(20);
        });

        modelBuilder.Entity<ActualActivity>(entity =>
        {
            entity.HasKey(e => e.ActuaActivityNumber).HasName("PK__Actual A__0A3025C9D287D770");

            entity.ToTable("Actual Activity");

            entity.Property(e => e.ActivityDate).HasColumnType("date");
            entity.Property(e => e.Equipment).HasMaxLength(250);

            entity.HasOne(d => d.ActivityNumberNavigation).WithMany(p => p.ActualActivities)
                .HasForeignKey(d => d.ActivityNumber)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Actual Ac__Activ__3D5E1FD2");

            entity.HasOne(d => d.KindergartenNumberNavigation).WithMany(p => p.ActualActivities)
                .HasForeignKey(d => d.KindergartenNumber)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Actual Ac__Kinde__3F466844");

            entity.HasOne(d => d.MealNumberNavigation).WithMany(p => p.ActualActivities)
                .HasForeignKey(d => d.MealNumber)
                .HasConstraintName("FK__Actual Ac__MealN__3E52440B");
        });

        modelBuilder.Entity<Attendance>(entity =>
        {
            entity.HasKey(e => e.AttendanceCode).HasName("PK__Attendan__013780A30C81E046");

            entity.ToTable("Attendance");

            entity.Property(e => e.AttendanceCode).ValueGeneratedNever();
            entity.Property(e => e.AttendanceCodeName).HasMaxLength(50);
        });

        modelBuilder.Entity<Child>(entity =>
        {
            entity.HasKey(e => e.ChildId).HasName("PK__Child__BEFA073686D4F394");

            entity.ToTable("Child");

            entity.Property(e => e.ChildId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("ChildID");
            entity.Property(e => e.ChildBirthDate).HasColumnType("datetime");
            entity.Property(e => e.ChildFirstName).HasMaxLength(10);
            entity.Property(e => e.ChildGender)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.ChildSurname).HasMaxLength(10);
            entity.Property(e => e.Parent1)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Parent_1");
            entity.Property(e => e.Parent2)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Parent_2");

            entity.HasOne(d => d.Parent1Navigation).WithMany(p => p.ChildParent1Navigations)
                .HasForeignKey(d => d.Parent1)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Child__Parent_1__5070F446");

            entity.HasOne(d => d.Parent2Navigation).WithMany(p => p.ChildParent2Navigations)
                .HasForeignKey(d => d.Parent2)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Child__Parent_2__5165187F");

            entity.HasMany(c => c.RegisterdTos)
            .WithOne(r => r.Child)
            .HasForeignKey(r => r.ChildId);
        });

        modelBuilder.Entity<DailyAttendance>(entity =>
        {
            entity.HasKey(e => e.DailyAttendanceId).HasName("PK__DailyAtt__70B4ADAB1DFE0664");

            entity.ToTable("DailyAttendance");

            entity.HasIndex(e => new { e.ChildId, e.Date }, "UQ__DailyAtt__C98980E7D6B1BA80").IsUnique();

            entity.Property(e => e.DailyAttendanceId).HasColumnName("DailyAttendanceID");
            entity.Property(e => e.ChildId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("ChildID");
            entity.Property(e => e.Date).HasColumnType("datetime");

            entity.HasOne(d => d.AfternoonPresenceNavigation).WithMany(p => p.DailyAttendanceAfternoonPresenceNavigations)
                .HasForeignKey(d => d.AfternoonPresence)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DailyAtte__After__114A936A");

            entity.HasOne(d => d.Child).WithMany(p => p.DailyAttendances)
                .HasForeignKey(d => d.ChildId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DailyAtte__Child__0F624AF8");

            entity.HasOne(d => d.MorningPresenceNavigation).WithMany(p => p.DailyAttendanceMorningPresenceNavigations)
                .HasForeignKey(d => d.MorningPresence)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DailyAtte__Morni__10566F31");
        });

        modelBuilder.Entity<DaySummary>(entity =>
        {
            entity.HasKey(e => e.DaySummaryDate).HasName("PK__Day Summ__2F5D717868A4F759");

            entity.ToTable("Day Summary");

            entity.Property(e => e.DaySummaryDate).HasColumnType("datetime");
            entity.Property(e => e.DaySummaryHour).HasColumnType("datetime");
            entity.Property(e => e.SummaryDetails).HasMaxLength(500);

            entity.HasOne(d => d.CurrentAcademicYearNavigation).WithMany(p => p.DaySummaries)
                .HasForeignKey(d => d.CurrentAcademicYear)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Day Summa__Curre__619B8048");

            entity.HasOne(d => d.KindergartenNumberNavigation).WithMany(p => p.DaySummaries)
                .HasForeignKey(d => d.KindergartenNumber)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Day Summa__Kinde__628FA481");
        });

        modelBuilder.Entity<DiagnosedWith>(entity =>
        {
            entity.HasKey(e => new { e.ChildId, e.HealthProblemsNumber }).HasName("PK__Diagnose__BB2FE8CB5B78C873");

            entity.ToTable("Diagnosed With");

            entity.Property(e => e.ChildId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("ChildID");
            entity.Property(e => e.Care).HasMaxLength(500);

            entity.HasOne(d => d.Child).WithMany(p => p.DiagnosedWiths)
                .HasForeignKey(d => d.ChildId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Diagnosed__Child__7A672E12");

            entity.HasOne(d => d.HealthProblemsNumberNavigation).WithMany(p => p.DiagnosedWiths)
                .HasForeignKey(d => d.HealthProblemsNumber)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Diagnosed__Healt__7B5B524B");
        });

        modelBuilder.Entity<Duty>(entity =>
        {
            entity.HasKey(e => e.DutyDate).HasName("PK__Duty__34617F93BC269568");

            entity.ToTable("Duty");

            entity.Property(e => e.DutyDate).HasColumnType("datetime");
            entity.Property(e => e.Child1)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Child_1");
            entity.Property(e => e.Child2)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Child_2");

            entity.HasOne(d => d.Child1Navigation).WithMany(p => p.DutyChild1Navigations)
                .HasForeignKey(d => d.Child1)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Duty__Child_1__59063A47");

            entity.HasOne(d => d.Child2Navigation).WithMany(p => p.DutyChild2Navigations)
                .HasForeignKey(d => d.Child2)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Duty__Child_2__59FA5E80");

            entity.HasOne(d => d.CurrentAcademicYearNavigation).WithMany(p => p.Duties)
                .HasForeignKey(d => d.CurrentAcademicYear)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Duty__CurrentAca__5AEE82B9");

            entity.HasOne(d => d.KindergartenNumberNavigation).WithMany(p => p.Duties)
                .HasForeignKey(d => d.KindergartenNumber)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Duty__Kindergart__5BE2A6F2");
        });

        modelBuilder.Entity<HealthProblem>(entity =>
        {
            entity.HasKey(e => e.HealthProblemsNumber).HasName("PK__Health P__5D5EFFD157813FF3");

            entity.ToTable("Health Problems");

            entity.Property(e => e.Care)
                .HasMaxLength(100)
                .HasColumnName("care");
            entity.Property(e => e.HealthProblemName).HasMaxLength(20);
        });

        modelBuilder.Entity<Interest>(entity =>
        {
            entity.HasKey(e => e.InterestsNumber).HasName("PK__Interest__00A5C7481F21EAF0");

            entity.Property(e => e.InterestsName)
                .HasMaxLength(20)
                .HasColumnName("[InterestsName");
        });

        modelBuilder.Entity<Kindergarten>(entity =>
        {
            entity.HasKey(e => e.KindergartenNumber).HasName("PK__Kinderga__93EF919E063C6863");

            entity.ToTable("Kindergarten");

            entity.Property(e => e.KindergartenNumber).ValueGeneratedNever();
            entity.Property(e => e.KindergartenAddress).HasMaxLength(30);
            entity.Property(e => e.KindergartenName).HasMaxLength(20);

            entity.HasMany(d => d.MealNumbers).WithMany(p => p.KindergartenNumbers)
                .UsingEntity<Dictionary<string, object>>(
                    "ServedIn",
                    r => r.HasOne<Meal>().WithMany()
                        .HasForeignKey("MealNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Served In__MealN__778AC167"),
                    l => l.HasOne<Kindergarten>().WithMany()
                        .HasForeignKey("KindergartenNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Served In__Kinde__76969D2E"),
                    j =>
                    {
                        j.HasKey("KindergartenNumber", "MealNumber").HasName("PK__Served I__80CBF1D406AFDC56");
                        j.ToTable("Served In");
                    });
        });

        modelBuilder.Entity<Meal>(entity =>
        {
            entity.HasKey(e => e.MealNumber).HasName("PK__Meal__324604A0880FE63D");

            entity.ToTable("Meal");

            entity.Property(e => e.MealDetails).HasMaxLength(100);
            entity.Property(e => e.MealType).HasMaxLength(20);
        });

        modelBuilder.Entity<Parent>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Parent__1788CCAC708C99D3");

            entity.ToTable("Parent");

            entity.Property(e => e.UserId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("UserID");

            entity.HasOne(d => d.User).WithOne(p => p.Parent)
                .HasForeignKey<Parent>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Parent__UserID__49C3F6B7");
        });

        modelBuilder.Entity<Photo>(entity =>
        {
            entity.HasKey(e => e.PhotoCode).HasName("PK__Photo__D954591E6A6AAC50");

            entity.ToTable("Photo");

            entity.Property(e => e.PhotoDate).HasColumnType("datetime");
            entity.Property(e => e.PhotoHour).HasColumnType("datetime");

            entity.HasOne(d => d.KindergartenNumberNavigation).WithMany(p => p.Photos)
                .HasForeignKey(d => d.KindergartenNumber)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Photo__Kindergar__5EBF139D");
        });

        modelBuilder.Entity<RegisterdTo>(entity =>
        {
            entity.HasKey(e => new { e.CurrentAcademicYear, e.ChildId }).HasName("PK__Register__05A8BAA08816888D");

            entity.ToTable("Registerd To");

            entity.Property(e => e.ChildId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("ChildID");

            entity.HasOne(d => d.Child).WithMany(p => p.RegisterdTos)
                .HasForeignKey(d => d.ChildId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Registerd__Child__72C60C4A");

            entity.HasOne(d => d.CurrentAcademicYearNavigation).WithMany(p => p.RegisterdTos)
                .HasForeignKey(d => d.CurrentAcademicYear)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Registerd__Curre__71D1E811");

            entity.HasOne(d => d.KindergartenNumberNavigation).WithMany(p => p.RegisterdTos)
                .HasForeignKey(d => d.KindergartenNumber)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Registerd__Kinde__73BA3083");
        });

        modelBuilder.Entity<StaffMember>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__staff me__1788CCACABC94C70");

            entity.ToTable("staff member");

            entity.Property(e => e.UserId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("UserID");
            entity.Property(e => e.KindergartenNumber).ValueGeneratedOnAdd();

            entity.HasOne(d => d.KindergartenNumberNavigation).WithMany(p => p.StaffMembers)
                .HasForeignKey(d => d.KindergartenNumber)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__staff mem__Kinde__4D94879B");

            entity.HasOne(d => d.User).WithOne(p => p.StaffMember)
                .HasForeignKey<StaffMember>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__staff mem__UserI__4CA06362");

            entity.HasMany(d => d.HealthProblemsNumbers).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "SufferingFrom",
                    r => r.HasOne<HealthProblem>().WithMany()
                        .HasForeignKey("HealthProblemsNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Suffering__Healt__7F2BE32F"),
                    l => l.HasOne<StaffMember>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Suffering__UserI__7E37BEF6"),
                    j =>
                    {
                        j.HasKey("UserId", "HealthProblemsNumber").HasName("PK__Sufferin__125D2351353FB0E3");
                        j.ToTable("Suffering From");
                        j.IndexerProperty<string>("UserId")
                            .HasMaxLength(9)
                            .IsUnicode(false)
                            .IsFixedLength()
                            .HasColumnName("UserID");
                    });
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CCAC32E13511");

            entity.ToTable("User");

            entity.Property(e => e.UserId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("UserID");
            entity.Property(e => e.UserAddress).HasMaxLength(30);
            entity.Property(e => e.UserBirthDate).HasColumnType("datetime");
            entity.Property(e => e.UserEmail)
                .HasMaxLength(40)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.UserGender)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.UserPhoneNumber)
                .HasMaxLength(11)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.UserPrivetName).HasMaxLength(10);
            entity.Property(e => e.UserSurname).HasMaxLength(10);
            entity.Property(e => e.UserpPassword).HasMaxLength(20);

            entity.HasMany(d => d.InterestsNumbers).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "InterestsOfStaffMember",
                    r => r.HasOne<Interest>().WithMany()
                        .HasForeignKey("InterestsNumber")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Interests__Inter__66603565"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Interests__UserI__656C112C"),
                    j =>
                    {
                        j.HasKey("UserId", "InterestsNumber").HasName("PK__Interest__878290D883595288");
                        j.ToTable("Interests of staff member");
                        j.IndexerProperty<string>("UserId")
                            .HasMaxLength(9)
                            .IsUnicode(false)
                            .IsFixedLength()
                            .HasColumnName("UserID");
                    });
        });

        modelBuilder.Entity<UserInKindergarten>(entity =>
        {
            entity.HasKey(e => new { e.CurrentAcademicYear, e.KindergartenNumber, e.UserId }).HasName("PK__User in __2A6E6B06E71BBE2A");

            entity.ToTable("User in Kindergarten ");

            entity.Property(e => e.UserId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("UserID");
            entity.Property(e => e.StartDate).HasColumnType("datetime");

            entity.HasOne(d => d.CurrentAcademicYearNavigation).WithMany(p => p.UserInKindergartens)
                .HasForeignKey(d => d.CurrentAcademicYear)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User in K__Curre__6D0D32F4");

            entity.HasOne(d => d.KindergartenNumberNavigation).WithMany(p => p.UserInKindergartens)
                .HasForeignKey(d => d.KindergartenNumber)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User in K__Kinde__6E01572D");

            entity.HasOne(d => d.User).WithMany(p => p.UserInKindergartens)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User in K__UserI__6EF57B66");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
