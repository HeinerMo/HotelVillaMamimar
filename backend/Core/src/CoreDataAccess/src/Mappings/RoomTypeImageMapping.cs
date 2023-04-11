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
    public class RoomTypeImageMapping : IEntityTypeConfiguration<RoomTypeImage>
    {
        public void Configure(EntityTypeBuilder<RoomTypeImage> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.ImageId)
                .IsRequired()
                .HasColumnType("int")
            .HasColumnName("imageId");

            builder.Property(c => c.RoomTypeId)
                .IsRequired()
                .HasColumnType("int")
            .HasColumnName("roomTypeId");

            builder.ToTable("tb_room_type_image");

        }

    }
}
