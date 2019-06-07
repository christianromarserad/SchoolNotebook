using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SchoolNotebook.Models
{
    public partial class SchoolNotebookContext : DbContext
    {
        public SchoolNotebookContext(DbContextOptions<SchoolNotebookContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bookmark> Bookmark { get; set; }
        public virtual DbSet<Notebook> Notebook { get; set; }
        public virtual DbSet<NotebookComment> NotebookComment { get; set; }
        public virtual DbSet<NotebookPage> NotebookPage { get; set; }
        public virtual DbSet<NotebookRate> NotebookRate { get; set; }
        public virtual DbSet<NotebookShare> NotebookShare { get; set; }
        public virtual DbSet<ReminderNote> ReminderNote { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.3-servicing-35854");

            modelBuilder.Entity<Bookmark>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.User)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.UserNavigation)
                    .WithMany(p => p.Bookmark)
                    .HasForeignKey(d => d.User)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bookmark_User");
            });

            modelBuilder.Entity<Notebook>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Color)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.User)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.UserNavigation)
                    .WithMany(p => p.Notebook)
                    .HasForeignKey(d => d.User)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Notebook_User");
            });

            modelBuilder.Entity<NotebookComment>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Comment)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.User)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Notebook)
                    .WithMany(p => p.NotebookComment)
                    .HasForeignKey(d => d.NotebookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NotebookComment_Notebook");

                entity.HasOne(d => d.UserNavigation)
                    .WithMany(p => p.NotebookComment)
                    .HasForeignKey(d => d.User)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NotebookComment_User");
            });

            modelBuilder.Entity<NotebookPage>(entity =>
            {
                entity.HasKey(e => new { e.NotebookId, e.PageNumber });

                entity.Property(e => e.Notes)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(d => d.Notebook)
                    .WithMany(p => p.NotebookPage)
                    .HasForeignKey(d => d.NotebookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NotebookPage_Notebook");
            });

            modelBuilder.Entity<NotebookRate>(entity =>
            {
                entity.HasKey(e => new { e.User, e.NotebookId });

                entity.Property(e => e.User)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Notebook)
                    .WithMany(p => p.NotebookRate)
                    .HasForeignKey(d => d.NotebookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NotebookRate_Notebook");

                entity.HasOne(d => d.UserNavigation)
                    .WithMany(p => p.NotebookRate)
                    .HasForeignKey(d => d.User)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NotebookRate_User");
            });

            modelBuilder.Entity<NotebookShare>(entity =>
            {
                entity.HasKey(e => new { e.User, e.NotebookId });

                entity.Property(e => e.User)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DateShared).HasColumnType("date");

                entity.HasOne(d => d.Notebook)
                    .WithMany(p => p.NotebookShare)
                    .HasForeignKey(d => d.NotebookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NotebookShare_Notebook");

                entity.HasOne(d => d.UserNavigation)
                    .WithMany(p => p.NotebookShare)
                    .HasForeignKey(d => d.User)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NotebookShare_User");
            });

            modelBuilder.Entity<ReminderNote>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Notes)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.User)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.UserNavigation)
                    .WithMany(p => p.ReminderNote)
                    .HasForeignKey(d => d.User)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ReminderNote_User");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Email)
                    .HasName("PK__User__A9D10535AEB66BC8");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();
            });
        }
    }
}
