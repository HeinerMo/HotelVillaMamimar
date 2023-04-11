using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_customer")]
    public class Customer
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; } 
        public string? IdNumber { get; set; }
        public string? CreditCardNumber { get; set; }

        public IEnumerable<Reservation>? Reservations { get; set; }
    }
}
