using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_image")]
    public class Image
    {
        public int? Id { get; set; }
        public Guid? UniqueIdentifier { get; set; }
        public Byte[]? ImageData { get; set; }

        public IEnumerable<HotelAboutImage>? HotelAboutImages { get; set;}
        public IEnumerable<AdvertisementImage>? AdvertisementImages { get; set;}
        public IEnumerable<HotelWelcomeImage>? HotelWelcomeImages { get; set;}
        public IEnumerable<FacilityImage>? FacilityImages { get; set;}
        public IEnumerable<RoomTypeImage>? RoomTypeImages { get; set;}

    }
}
