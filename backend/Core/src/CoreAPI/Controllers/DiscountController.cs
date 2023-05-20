using CoreBusiness.src.BusinessAccessObjects;
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

    }
}
