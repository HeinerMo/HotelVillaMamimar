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
    public class CustomerMapping: IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder) 
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasColumnType("varchar(80)")
            .HasColumnName("name");

            builder.Property(c => c.LastName)
                .IsRequired()
                .HasColumnType("varchar(80)")
            .HasColumnName("lastName");

            builder.Property(c => c.Email)
                .IsRequired()
                .HasColumnType("varchar(100)")
            .HasColumnName("email");

            builder.Property(c => c.IdNumber)
                .IsRequired()
                .HasColumnType("varchar(100)")
            .HasColumnName("id_number");

            builder.Property(c => c.CreditCardNumber)
                .IsRequired()
                .HasColumnType("varchar(100)")
            .HasColumnName("creditCardNumber");

            builder.ToTable("tb_customer");

        }
    }
}
