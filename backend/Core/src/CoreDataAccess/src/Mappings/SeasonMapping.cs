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
    public class SeasonMapping: IEntityTypeConfiguration<Season>
    {
        public void Configure(EntityTypeBuilder<Season> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasColumnType("varchar(80)")
            .HasColumnName("name");

            builder.Property(c => c.Porcentage)
              .IsRequired()
              .HasColumnType("int")
          .HasColumnName("porcentage");

            builder.Property(c => c.StartingDate)
                .IsRequired()
                .HasColumnType("date")
            .HasColumnName("startingDate");

            builder.Property(c => c.EndingDate)
                .IsRequired()
                .HasColumnType("date")
            .HasColumnName("endingDate");

            builder.ToTable("tb_season");
        }

    }
}
