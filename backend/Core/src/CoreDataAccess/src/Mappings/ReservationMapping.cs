using CoreEntities.src.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDataAccess.src.Mappings
{
    public class ReservationMapping: IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.StartingDate)
                .IsRequired()
                .HasColumnType("date")
            .HasColumnName("startingDate");

            builder.Property(c => c.EndingDate)
                .IsRequired()
                .HasColumnType("date")
            .HasColumnName("endingDate");

            builder.Property(c => c.RoomId)
                .IsRequired()
                .HasColumnType("int")
            .HasColumnName("roomId");

            builder.Property(c => c.CustomerId)
                .IsRequired()
                .HasColumnType("int")
            .HasColumnName("customerId");


            //EF Relation

            builder.HasOne(c => c.Room)
                .WithMany(b => b.Reservations)
                .HasForeignKey(b => b.RoomId);

            builder.HasOne(c => c.Customer)
                .WithMany(b => b.Reservations)
                .HasForeignKey(b => b.CustomerId);

            builder.ToTable("tb_reservation");
        }

    }
}
