using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    public class HotelAboutImage
    {
        public int? Id { get; set; }
        public int ImageId { get; set; }

        public Image? Image { get; set; }
    }
}
