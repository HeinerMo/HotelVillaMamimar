using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_hotel_welcome_image")]
    public class HotelWelcomeImage
    {
        public int? Id { get; set; }
        public int? ImageId { get; set; }

        public Image? Image { get; set; }
    }
}
