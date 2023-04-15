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
    public class LocationMapping: IEntityTypeConfiguration<Location>
    {
        public void Configure(EntityTypeBuilder<Location> builder)
        { 
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Latitude)
                .IsRequired()
                .HasColumnType("decimal(8,6)")
            .HasColumnName("latitude");

            builder.Property(c => c.Longitude)
                .IsRequired()
                .HasColumnType("deciaml(9,6)")
            .HasColumnName("longitude");

            builder.Property(c => c.ExtraDetails)
                .HasColumnType("varchar(100)")
            .HasColumnName("extraDetails");

            builder.ToTable("tb_location");
        }

    }
}
