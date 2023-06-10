using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public async Task<ActionResult<ResponseDTO<List<Discount>>>> GetAllDiscounts()
        {
            return await discountDataAccess.GetAllDiscounts();
        }

        public async Task<ActionResult<ResponseDTO<Discount>>> UpdateDiscount(Discount discount)
        {
            return await discountDataAccess.UpdateDiscount(discount);

        }

        public async Task<ActionResult<ResponseDTO<List<Discount>>>> CreateDiscount(Discount discount)
        {
            return await discountDataAccess.CreateDiscount(discount);
        }

        public async Task<ActionResult<ResponseDTO<List<Discount>>>> DeleteDiscount(Discount discount)
        {
            return await discountDataAccess.DeleteDiscount(discount);
        }

    }
}
