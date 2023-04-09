using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    public class AdvertisementImage
    {
        public int? Id { get; set; }
        public int? ImageId { get; set; }
        public int? AdvertisementId { get; set; }

        public Image? Image { get; set;}
        public Advertisement? Advertisement { get; set; }
    }
}
