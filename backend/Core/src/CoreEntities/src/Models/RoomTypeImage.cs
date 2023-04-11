using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_room_type_image")]
    public class RoomTypeImage
    {
        public int? Id { get; set; }
        public int? ImageId { get; set; }
        public int? RoomTypeId { get; set; }

        public Image? Image { get; set; }
        public RoomType? RoomType { get; set; }
    }
}
