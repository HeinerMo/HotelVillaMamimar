using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_advertisement_image")]
    public class AdvertisementImage
    {
        public int? Id { get; set; }
        public int? ImageId { get; set; }
        public int? AdvertisementId { get; set; }

        public Image? Image { get; set;}
        public Advertisement? Advertisement { get; set; }
    }
}
