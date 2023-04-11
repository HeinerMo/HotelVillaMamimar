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
    public class HotelWelcomeImageMapping : IEntityTypeConfiguration<HotelWelcomeImage>
    {

        public void Configure(EntityTypeBuilder<HotelWelcomeImage> builder) 
        { 
            builder.HasKey(c => c.Id);
            
            builder.Property(c => c.ImageId)
                .IsRequired()
                .HasColumnType("int")
            .HasColumnName("imageId");

            builder.ToTable("tb_hotel_welcome_image");
        }
    }
}
