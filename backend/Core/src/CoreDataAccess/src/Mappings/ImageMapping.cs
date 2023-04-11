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
    public class imageMapping : IEntityTypeConfiguration<Image>
    {

        public void Configure(EntityTypeBuilder<Image> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.UniqueIdentifier)
                .IsRequired()
                .HasColumnType("uniqueidentifier")
            .HasColumnName("uniqueidentifier");

            builder.Property(c => c.ImageData)
                .HasColumnType("varbinary(MAX)")
            .HasColumnName("imageData");

            builder.ToTable("tb_image");
        }
    }
}
