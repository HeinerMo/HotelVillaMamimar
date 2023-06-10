using CoreBusiness.src.BusinessAccessObjects;
using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;

namespace CoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DiscountController
    {

        private readonly DiscountBusiness discountBusiness;

        public DiscountController() 
        {
            this.discountBusiness = new DiscountBusiness();
        }

        [HttpGet]
        [Route("GetDiscount")]
        public async Task<ActionResult<ResponseDTO<List<Discount>>>> GetDiscount()
        { 
            return await this.discountBusiness.GetDiscount();
        }

        [HttpGet]
        [Route("GetDiscountByRoomType")]
        public async Task<ActionResult<ResponseDTO<Discount>>> GetDiscountByRoomType(int roomTypeId)
        { 
            return await this.discountBusiness.GetDiscountByRoomType(roomTypeId);
        }

        [HttpGet]
        [Route("GetAllDiscounts")]
        public async Task<ActionResult<ResponseDTO<List<Discount>>>> GetAllDiscounts()
        {
            return await discountBusiness.GetAllDiscounts();
        }

        [HttpPut]
        [Route("UpdateDiscount")]
        public async Task<ActionResult<ResponseDTO<Discount>>> UpdateDiscount(Discount discount)
        {
            return await discountBusiness.UpdateDiscount(discount);

        }

        [HttpPost]
        [Route("CreateDiscount")]
        public async Task<ActionResult<ResponseDTO<List<Discount>>>> CreateDiscount(Discount discount)
        {
            return await discountBusiness.CreateDiscount(discount);
        }

        [HttpDelete]
        [Route("DeleteDiscount")]
        public async Task<ActionResult<ResponseDTO<List<Discount>>>> DeleteDiscount(Discount discount)
        {
            return await discountBusiness.DeleteDiscount(discount);
        }

    }
}
