using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDataAccess.src.DataAccessObjects
{
    public class ReservationDataAccess
    {

        private readonly DataContext _context;

        public ReservationDataAccess() {
            _context = new DataContext();
        }

        public async Task<ActionResult<ResponseDTO<Reservation>>> CreateReservation(Reservation reservation)
        {
            var response = new ResponseDTO<Reservation>()
            {
                Id = 1,
                Message = "Solicitud realizada correctamente"
            };
            try
            {
                _context.Reservations.Add(reservation);
                await _context.SaveChangesAsync();
                response.Item = reservation;
            }
            catch (Exception e)
            {
                response.Id = 0;
                response.Message = e.ToString();
            }
            return await Task.FromResult(response);
        }

        public async Task<ActionResult<ResponseDTO<List<Reservation>>>> GetReservationsToList()
        {
            var responseDTO = new ResponseDTO<List<Reservation>>();

            var dbReservation = _context.Reservations.Include(i => i.Customer).Include(j => j.Room).ToList();
            var dbRoomType = _context.roomTypes.ToList();
            foreach (Reservation i in dbReservation)
            {
                foreach (RoomType j in dbRoomType) 
                {
                    if (i.Room.RoomTypeId == j.Id)
                    {
                        i.roomTypeName = j.Name;
                    }
                }
               
            }

            if (dbReservation == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer los las reservaciones";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbReservation;
            }

            return await Task.FromResult(responseDTO);


        }

        public async Task<ActionResult<ResponseDTO<List<Reservation>>>> DeleteReservation(int id)
        {
            var responseDTO = new ResponseDTO<List<Reservation>>();



            var dbReservation = _context.Reservations.FirstOrDefault(e => e.Id == id);


            if (dbReservation == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "delete failed";
                return await Task.FromResult(responseDTO);
                
            }
            else 
            {
                _context.Reservations.Remove(dbReservation);
                _context.SaveChanges();
                responseDTO.Id = 1;
                responseDTO.Message = "delete success";
                responseDTO.Item = null;
                return await Task.FromResult(responseDTO);
            }

            
        }



    }
}
