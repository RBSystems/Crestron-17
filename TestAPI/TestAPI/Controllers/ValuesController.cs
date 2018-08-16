using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.DirectoryServices;
using TestAPI.Models;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace TestAPI.Controllers
{
    public class ValuesController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnStr"].ConnectionString);

        public HttpResponseMessage Options()
        {
            return new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
        }

        public string UserData { get; }
        private string _path;
        private string _filterAttribute;

        public ValuesController() { }

        [HttpGet]
        [HttpPost]
        public bool IsAuthenticated(string username, string pwd)
        {
            string domainAndUsername = "16ELM" + @"\" + username;
            _path = "LDAP://sit.nyp.edu.sg/dc=sit,dc=nyp,dc=edu,dc=sg";
            DirectoryEntry entry = new DirectoryEntry(_path, domainAndUsername, pwd);
            try
            {
                // Bind to the native AdsObject to force authentication.
                Object obj = entry.NativeObject;
                DirectorySearcher search = new DirectorySearcher(entry);
                search.Filter = "(SAMAccountName=" + username + ")";
                search.PropertiesToLoad.Add("cn");
                SearchResult result = search.FindOne();
                if (null == result)
                {
                    return false;
                }
                // Update the new path to the user in the directory
                _path = result.Path;
                _filterAttribute = (String)result.Properties["cn"][0];

            }
            catch (Exception ex)
            {
                throw new Exception("Error authentication user. " + ex.Message);
            }
            return true;
        }

        [HttpGet]
        public Projector GetProjector(string EncryptedRoomNum)
        {
            conn.Open();
            Projector p = new Projector();
            string query = "Select * from tblProjectors where EncryptedRoomNum = '" + EncryptedRoomNum + "'";
            SqlDataAdapter da = new SqlDataAdapter(query, conn);
            DataSet ds = new DataSet();
            da.Fill(ds, "tblProjectors");
            int rec_count = ds.Tables["tblProjectors"].Rows.Count;
            if (rec_count > 0)
            {
                DataRow row = ds.Tables["tblProjectors"].Rows[0];
                p.RoomNum = row["RoomNum"].ToString();
                p.EncryptedRoomNum = row["EncryptedRoomNum"].ToString();
                p.RoomID = row["RoomID"].ToString();
                p.SymbolID = row["SymbolID"].ToString();
            }
            else
            {
                p = null;
            }
            conn.Close();

            return p;
        }

        [HttpPost]
        public void InsertActionLog(string RoomNum, string AccountID, string Projector_Function, double Latitude, double Longitude, string SSID)
        {
            conn.Open();
            string query = "Insert into tblActionLog values(@paraRoomNum, @paraAccountID, @paraProjector_Function, GETDATE(), @paraLatitude, @paraLongitude, @paraSSID)";
            SqlCommand InsertCom = new SqlCommand(query, conn);
            InsertCom.Parameters.AddWithValue("@paraRoomNum", RoomNum);
            InsertCom.Parameters.AddWithValue("@paraAccountID", AccountID);
            InsertCom.Parameters.AddWithValue("@paraProjector_Function", Projector_Function);
            InsertCom.Parameters.AddWithValue("@paraLatitude", Latitude);
            InsertCom.Parameters.AddWithValue("@paraLongitude", Longitude);
            InsertCom.Parameters.AddWithValue("@paraSSID", SSID);
            InsertCom.ExecuteNonQuery();
            conn.Close();
        }
    }
}
