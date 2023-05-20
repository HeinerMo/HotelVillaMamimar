using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreBusiness.src.BusinessAccessObjects
{
    public class DiscountBusiness
    {

        private readonly DiscountDataAccess discountDataAccess;

        public DiscountBusiness() 
        {
            discountDataAccess = new DiscountDataAccess();
        }

        public async Task<ActionResult<ResponseDTO<List<Discount>>>> GetDiscount() 
        {
            return await discountDataAccess.GetDiscount(); 
        }

        public async Task<ActionResult<ResponseDTO<Discount>>> GetDiscountByRoomType(int roomTypeId)
        { 
            return await discountDataAccess.GetDiscountByRoomType(roomTypeId);
        }

    }
}
