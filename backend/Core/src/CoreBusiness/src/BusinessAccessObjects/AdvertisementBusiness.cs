using CoreDataAccess.src.DataAccessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CoreBusiness.src.BusinessAccessObjects
{
    public class AdvertisementBusiness
    {
        private readonly AdvertisementDataAccess advertisementDataAcess;

        public AdvertisementBusiness()
        {
            this.advertisementDataAcess = new AdvertisementDataAccess();
        }

        public async Task<ActionResult<ResponseDTO<Advertisement>>> createAdvertisement(Advertisement advertisement)
        { 
            return await advertisementDataAcess.createAdvertisement(advertisement);
        }

        public async Task<ActionResult<ResponseDTO<Advertisement>>> UpdateAdvertisement(Advertisement advertisement)
        {
            return await advertisementDataAcess.UpdateAdvertisement(advertisement);
        }

        public async Task<ActionResult<ResponseDTO<List<Advertisement>>>> GetAdvertisiment()
        {
            return await advertisementDataAcess.GetAdvertisiment();
        }

        public async Task<ActionResult<ResponseDTO<List<Advertisement>>>> DeleteAdvertisement(Advertisement advertisement)
        {
            return await advertisementDataAcess.DeleteAdvertisement(advertisement);
        }


    }
}
