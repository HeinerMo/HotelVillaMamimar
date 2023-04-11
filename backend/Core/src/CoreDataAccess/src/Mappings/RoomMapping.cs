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
    public class RoomMapping : IEntityTypeConfiguration<Room>
    {
        public void Configure(EntityTypeBuilder<Room> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.RoomTypeId)
                .IsRequired()
                .HasColumnType("int")
            .HasColumnName("roomTypeId");

            builder.Property(c => c.Active)
                .IsRequired()
                .HasColumnType("bit")
            .HasColumnName("active");

            builder.ToTable("tb_room");

        }

    }
}
