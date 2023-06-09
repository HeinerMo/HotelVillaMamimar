﻿using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDataAccess.src.DataAccessObjects
{
    public class RoomDataAccess
    {
        private readonly DataContext _context;
        public RoomDataAccess()
        {
            _context = new DataContext();
        }

        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetAllRooms()
        {
            var responseDTO = new ResponseDTO<List<Room>>();
            
            var currentDate = DateTime.Now;

            var dbRooms = _context.rooms
                .Include(r => r.RoomType)
                .ToList();

            foreach (var room in dbRooms)
            {
                room.Reserved = room.Reservations != null && room.Reservations
                    .Any(reservation =>
                        reservation.StartingDate <= currentDate &&
                        reservation.EndingDate >= currentDate);
            }


            if (dbRooms == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer las habitaciones";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbRooms;
            }

            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<Room>>> UpdateRoom(Room room)
        {
            var dbRoom = _context.rooms.FirstOrDefault(s => s.Id == room.Id);

            var responseDTO = new ResponseDTO<Room>();
            if (dbRoom == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "update failed";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                Console.WriteLine(room.RoomTypeId);
                dbRoom.Id = room.Id;
                dbRoom.Active = room.Active;
                dbRoom.RoomTypeId = room.RoomTypeId;

                _context.SaveChanges();

                responseDTO.Id = 1;
                responseDTO.Message = "update success";
                responseDTO.Item = dbRoom;
                return await Task.FromResult(responseDTO);
            }
        }

        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetRoomsStatus()
        {
            var currentDate = DateTime.Now;

            var query = _context.rooms
                .Select(r => new
                {
                    Room = r,
                    ReservationStatus = r.Reservations
                        .Any(res => res.StartingDate <= currentDate && res.EndingDate >= currentDate) ? (r.Active ? "Reservada" : "Inactiva") : (r.Active ? "Disponible" : "Inactiva")
                });

            var responseDTO = new ResponseDTO<List<Room>>();

            if (query == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al obtener la lista de habitaciones";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = query.Select(result => new Room
                {
                    Id = result.Room.Id,
                    Active = result.Room.Active,
                    RoomType = result.Room.RoomType,
                    ReservationStatus = result.ReservationStatus
                }).ToList();
            }

            return await Task.FromResult(responseDTO);


        }

            public async Task<ActionResult<ResponseDTO<List<Room>>>> GetAvailableRooms(DateTime startDate, DateTime endDate, int roomTypeId)
        {
            var dbRoom = _context.rooms; //load database.

            /*This should not be here. This is horrible coupling*/
            var dbReservation = _context.Reservations;

            var query = from room in dbRoom
                        join reservation in dbReservation on room.Id equals reservation.RoomId into reservations
                        from reservation in reservations.DefaultIfEmpty()
                        where (room.RoomTypeId == roomTypeId) &&
                              ((reservation == null) ||
                               (reservation.StartingDate <= startDate && startDate <= reservation.EndingDate) ||
                               (endDate >= reservation.StartingDate && endDate <= reservation.EndingDate) ||
                               (startDate <= reservation.StartingDate && endDate >= reservation.EndingDate))
                        select room;
            /*
                var query = from room in dbRoom
                        join reservation in dbReservation on room.Id equals reservation.RoomId
                        where (room.RoomTypeId == roomTypeId) && (reservation.StartingDate <= startDate && startDate <= reservation.EndingDate
                        || endDate >= reservation.StartingDate && endDate <= reservation.EndingDate
                        || startDate <= reservation.StartingDate && endDate >= reservation.EndingDate)
                        select room;
            */


            var responseDTO = new ResponseDTO<List<Room>>(); //Create response data transfer object 

            if (query == null) //if no rooms where found then return an error message
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al obtener la lista de habitaciones";
                return await Task.FromResult(responseDTO); //wait for task to finish (await)
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = query.ToList();
            }

            return await Task.FromResult(responseDTO);

            /*
             * Alternative solution without the use of "if" statement. 
             * 
            var dbRoom = _context.rooms; // Load database rooms into a variable.
            var responseDTO = new ResponseDTO<List<Room>> // Create response data transfer object.
            {
                Id = dbRoom == null ? 0 : 1,
                Message = dbRoom == null ? "Error al obtener la lista de habitaciones" : null,
                Item = dbRoom?.ToList()
            };
            return await Task.FromResult(responseDTO);
             */
        }



        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetAvailableRoomsToAdmin(string startDate, string endDate, int roomTypeId)
        {
            var statingDateAux = DateTime.Parse(startDate);
            var endingDateAux = DateTime.Parse(endDate);

            // This show the NOT available rooms
            /*var dbRooms = _context.rooms.Where(room => room.RoomTypeId == roomTypeId)
                .Join(_context.Reservations.Where(r => r.StartingDate >= statingDateAux && r.EndingDate <= endingDateAux),
                    room => room.Id,
                    r => r.RoomId,
                    (room, r) => new Room
                    {
                        Id = room.Id,
                        RoomTypeId = room.RoomTypeId,
                        Active = room.Active,
                        RoomType = room.RoomType
                    })
                .ToList();*/

            // This show the available rooms
            var dbRooms = _context.rooms.Where(room => room.RoomTypeId == roomTypeId && room.Active == true)
                .Where(room => !_context.Reservations.Any(r => r.RoomId == room.Id &&
                                                              r.StartingDate >= statingDateAux &&
                                                              r.EndingDate <= endingDateAux))
                .Select(room => new Room
                {
                    Id = room.Id,
                    RoomTypeId = room.RoomTypeId,
                    Active = room.Active,
                    RoomType = room.RoomType
                })
                .ToList();


            var responseDTO = new ResponseDTO<List<Room>>();

            if (dbRooms == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer las habitaciones";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbRooms;
            }

            return await Task.FromResult(responseDTO);
        }

    }
}
