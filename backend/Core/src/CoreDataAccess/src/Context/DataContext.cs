using CoreEntities.src.Models;
using Microsoft.EntityFrameworkCore;

namespace CoreDataAccess.src.Context
{
    internal class DataContext: DbContext
    {

        public DataContext() { }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=hotelMamimar;Integrated Security=True;TrustServerCertificate=True;");
        }

        public DbSet<Season> Seasons => Set<Season>();
        public DbSet<Location> Locations => Set<Location>();
        public DbSet<Admin> Admins => Set<Admin>();
        public DbSet<Facility> Facilities => Set<Facility>();
        public DbSet<Advertisement> Advertisements => Set<Advertisement>();
        public DbSet<HotelAboutImage> hotelAboutImages => Set<HotelAboutImage>();
        public DbSet<AdvertisementImage> advertisementImages => Set<AdvertisementImage>();
        public DbSet<HotelWelcomeImage> hotelWelcomeImages => Set<HotelWelcomeImage>();
        public DbSet<HotelInformation> HotelInformation => Set<HotelInformation>();
        public DbSet<FacilityImage> facilityImages => Set<FacilityImage>();
        public DbSet<Image> images => Set<Image>();
        public DbSet<Reservation> Reservations => Set<Reservation>();
        public DbSet<Room> rooms => Set<Room>();
        public DbSet<RoomTypeImage> roomTypeImages => Set<RoomTypeImage>();
        public DbSet<Customer> customers => Set<Customer>();
        public DbSet<RoomType> roomTypes => Set<RoomType>();
        public DbSet<Discount> discounts => Set<Discount>();    




    }
}
