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
    public class AdminMapping: IEntityTypeConfiguration<Admin>
    {
        public void Configure(EntityTypeBuilder<Admin> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.UserName)
                .IsRequired()
                .HasColumnType("varchar(80)")
            .HasColumnName("userName"); 
        

            builder.Property(c => c.Password)
                .IsRequired()
                .HasColumnType("varchar(80)")
            .HasColumnName("password");

            builder.ToTable("tb_admin");

        }

    }
}
