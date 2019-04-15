using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestAPI.Models
{
    public class ProjectorActionLog
    {
        public string RoomNum { get; set; }
        public string AccountID { get; set; }
        public string Projector_Function { get; set; }
        public DateTime TimeStamp { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string BSSID { get; set; }
    }
}