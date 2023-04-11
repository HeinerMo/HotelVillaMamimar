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
    public class AdvertisementMapping: IEntityTypeConfiguration<Advertisement>
    {

        public void Configure(EntityTypeBuilder<Advertisement> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Url)
                .IsRequired()
                .HasColumnType("varchar(100)")
            .HasColumnName("url");

            builder.ToTable("tb_advertisement");
        }

    }
}
