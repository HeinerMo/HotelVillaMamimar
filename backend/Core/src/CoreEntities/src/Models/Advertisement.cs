using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_advertisement")]
    public class Advertisement
    {
        public int? Id { get; set; }
        public string? Url { get; set; } = string.Empty;

        public IEnumerable<AdvertisementImage>? AdvertisementImages { get; set; }
    }
}
