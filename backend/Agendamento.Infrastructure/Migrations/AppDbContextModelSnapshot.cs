using System;
using Agendamento.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Agendamento.Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.0");

            modelBuilder.Entity("Agendamento.Core.Models.Event", b =>
            {
                b.Property<Guid>("Id").HasColumnType("uuid");
                b.Property<string>("Color").HasColumnType("text");
                b.Property<string>("Description").HasColumnType("text");
                b.Property<DateTimeOffset>("End").HasColumnType("timestamp with time zone");
                b.Property<string>("Location").HasColumnType("text");
                b.Property<int?>("RemindMinutesBefore").HasColumnType("integer");
                b.Property<DateTimeOffset>("Start").HasColumnType("timestamp with time zone");
                b.Property<string>("Title").IsRequired().HasColumnType("text");
                b.HasKey("Id");
                b.ToTable("Events");
            });
#pragma warning restore 612, 618
        }
    }
}
