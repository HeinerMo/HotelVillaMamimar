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
    public class FacilityMapping: IEntityTypeConfiguration<Facility>
    {

        public void Configure(EntityTypeBuilder<Facility> builder)
        { 
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Description)
                .IsRequired()
                .HasColumnType("varchar(500)")
            .HasColumnName("description");

            builder.ToTable("tb_facility");

        }
    }
}
