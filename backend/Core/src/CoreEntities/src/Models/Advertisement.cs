using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    public class Advertisement
    {
        public int? Id { get; set; }
        public string? Url { get; set; } = string.Empty;

        public IEnumerable<AdvertisementImage>? AdvertisementImages { get; set; }
    }
}
