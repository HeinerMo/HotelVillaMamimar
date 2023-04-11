using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_discount")]
    public class Discount
    {
        public int? Id { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? EndingDate { get; set; }
        public string? Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public int? RoomTypeId { get; set; }

        public RoomType? RoomType { get; set; }

    }
}
