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
    public class HotelInformationMapping : IEntityTypeConfiguration<HotelInformation>
    {

        public void Configure(EntityTypeBuilder<HotelInformation> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Phone)
                .IsRequired()
                .HasColumnType("varchar(20)")
            .HasColumnName("phone");

            builder.Property(c => c.Email)
                .IsRequired()
                .HasColumnType("varchar(80)")
            .HasColumnName("email");

            builder.Property(c => c.Instagram)
                .HasColumnType("varchar(200)")
            .HasColumnName("instagram");

            builder.Property(c => c.Facebook)
                .HasColumnType("varchar(200)")
            .HasColumnName("facebook");

            builder.Property(c => c.WelcomeMessage)
                .HasColumnType("varchar(500)")
            .HasColumnName("welcomeMessage");

            builder.Property(c => c.AboutMessage)
                .HasColumnType("varchar(500)")
            .HasColumnName("aboutMessage");

            builder.ToTable("tb_hotel_information");

        }
    }
}