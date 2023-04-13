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
    public class HotelAboutImageMapping : IEntityTypeConfiguration<HotelAboutImage>
    {
        public void Configure(EntityTypeBuilder<HotelAboutImage> builder) 
        { 
            builder.HasKey(c => c.Id);

            builder.Property(c => c.ImageId)
                .IsRequired()
                .HasColumnType("int")
            .HasColumnName("imageId");

            builder.HasOne(c => c.Image)
                .WithMany(b => b.HotelAboutImages)
                .HasForeignKey(b => b.ImageId);

            builder.ToTable("tb_hotel_about_image");
        }
    }
}
