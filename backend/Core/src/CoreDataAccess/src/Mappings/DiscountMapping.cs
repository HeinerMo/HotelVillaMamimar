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
    public class DiscountMapping : IEntityTypeConfiguration<Discount>
    {
        public void Configure(EntityTypeBuilder<Discount> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.StartingDate)
                .IsRequired()
                .HasColumnType("datetime")
            .HasColumnName("startingDate");

            builder.Property(c => c.EndingDate)
               .IsRequired()
               .HasColumnType("datetime")
           .HasColumnName("endingDate");

            builder.Property(c => c.Name)
               .HasColumnType("varchar(80)")
           .HasColumnName("name");

            builder.Property(c => c.Description)
               .HasColumnType("varchar(500)")
           .HasColumnName("description");

            builder.Property(c => c.RoomTypeId)
               .IsRequired()
               .HasColumnType("int")
           .HasColumnName("roomTypeId");

            builder.ToTable("tb_discount");
        }

    }
}
