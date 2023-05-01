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
    public class AdvertisementImageMapping: IEntityTypeConfiguration<AdvertisementImage>
    {

        public void Configure(EntityTypeBuilder<AdvertisementImage> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.ImageId)
                .IsRequired()
                .HasColumnType("int")
            .HasColumnName("imageId");

            builder.Property(c => c.AdvertisementId)
                .IsRequired()
                .HasColumnType("int")
            .HasColumnName("advertisementId");

            builder.HasOne(c => c.Image)
                .WithMany(b => b.AdvertisementImages)
                .HasForeignKey(b => b.ImageId);

            builder.ToTable("tb_advertisement_image");
        }
    }
}
