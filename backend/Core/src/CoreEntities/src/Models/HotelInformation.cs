using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_hotel_information")]
    public class HotelInformation
    {
        public int? Id { get; set; }
        public string? Phone { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public string? Instagram { get; set; } = string.Empty;
        public string? Facebook { get; set; } = string.Empty;
        public string? WelcomeMessage { get; set; } = string.Empty;
        public string? AboutMessage { get; set; } = string.Empty;
        [NotMapped]
        public string? HexImageString { get; set; }
    }
}
