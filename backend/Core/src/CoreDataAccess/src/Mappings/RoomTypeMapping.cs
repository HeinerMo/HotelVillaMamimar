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
    public class RoomTypeMapping : IEntityTypeConfiguration<RoomType>
    {

        public void Configure(EntityTypeBuilder<RoomType> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Price)
                .IsRequired()
                .HasColumnType("numeric(11,4)")
            .HasColumnName("price");

            builder.Property(c => c.Name)
                .IsRequired()
                .HasColumnType("varchar(80)")
            .HasColumnName("name");

            builder.Property(c => c.Description)
                .IsRequired()
                .HasColumnType("varchar(500)")
            .HasColumnName("description");

            builder.Property(c => c.IsDeleted)
                .IsRequired()
                .HasColumnType("bit")
            .HasColumnName("isDeleted");

            builder.ToTable("tb_room_type");
        }

    }
}
