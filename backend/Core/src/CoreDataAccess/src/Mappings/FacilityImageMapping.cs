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
    public class FacilityImageMapping : IEntityTypeConfiguration<FacilityImage>
    {
        public void Configure(EntityTypeBuilder<FacilityImage> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.ImageId)
                .IsRequired()
                .HasColumnType("int")
            .HasColumnName("imageId");

            builder.Property(c => c.FacilityId)
                .IsRequired()
                .HasColumnType("int")
            .HasColumnName("facilityId");

            builder.ToTable("tb_facility_image");
        }

    }
}
