﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_facility_image")]
    public class FacilityImage
    {
        public int? Id { get; set; }
        public int? ImageId { get; set; }
        public int? FacilityId { get; set; }

        public Image? Image { get; set; }
        public Facility? Facility { get; set; }
    }
}
