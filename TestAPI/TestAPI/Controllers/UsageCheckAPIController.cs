using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestAPI.Models;

namespace TestAPI.Controllers
{
    public class UsageCheckAPIController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnStr"].ConnectionString);
        [HttpGet]
        [HttpPost]
        public CrestronUsageCheck CheckUsage(string RoomNum1)
        {
            conn.Open();
            CrestronUsageCheck c = new CrestronUsageCheck();
            string query = "select * from tblUsageCheck where RoomNum = '" + RoomNum1 + "'";
            SqlDataAdapter da = new SqlDataAdapter(query, conn);
            DataSet ds = new DataSet();
            da.Fill(ds, "tblUsageCheck");
            int rec_count = ds.Tables["tblUsageCheck"].Rows.Count;
            if (rec_count > 0)
            {
                try
                {
                    DataRow row = ds.Tables["tblUsageCheck"].Rows[0];
                    c.CurrentUser = row["CurrentUser"].ToString();
                    c.Duration = Convert.ToDateTime(row["Duration"]);
                    c.CurrentlyUsed = Convert.ToBoolean(row["CurrentlyUsed"]);
                }
                catch (NullReferenceException)
                {

                }
                
            }
            else
            {
                c = null;
            }
            conn.Close();
            return c;

        }
        [HttpGet]
        public int CheckRoom(string RoomNum)
        {
            conn.Open();
            string query = "select count(*) from tblUsageCheck where RoomNum = '" + RoomNum + "'";
            SqlCommand com = new SqlCommand(query, conn);
            int RoomExists = Convert.ToInt32(com.ExecuteScalar().ToString());
            conn.Close();
            return RoomExists;
        }

        [HttpPost]
        [HttpPut]
        public void InsertUsage(string RoomNum, string CurrentUser, int CurrentlyUsed)
        {
            int RoomExists = CheckRoom(RoomNum);
            conn.Open();
            if (RoomExists == 1)
            {
                string query = "update tblUsageCheck set CurrentUser=@paraCurrentUser, CurrentlyUsed=@paraCurrentlyUsed, Duration=GETDATE() where RoomNum = '" + RoomNum + "'";
                SqlCommand UpdateCom = new SqlCommand(query, conn);
                UpdateCom.Parameters.AddWithValue("@paraCurrentUser", CurrentUser);
                UpdateCom.Parameters.AddWithValue("@paraCurrentlyUsed", CurrentlyUsed);
                UpdateCom.ExecuteNonQuery();
            }
            else
            {
                string query = "Insert into tblUsageCheck values(@paraRoomNum, @paraCurrentUser, GETDATE(), @paraCurrentlyUsed)";
                SqlCommand InsertCom = new SqlCommand(query, conn);
                InsertCom.Parameters.AddWithValue("@paraRoomNum", RoomNum);
                InsertCom.Parameters.AddWithValue("@paraCurrentUser", CurrentUser);
                InsertCom.Parameters.AddWithValue("@paraCurrentlyUsed", CurrentlyUsed);
                InsertCom.ExecuteNonQuery();
            }
            conn.Close();
        }

        [HttpPost]
        public void InsertRoom(string RoomNum2, string CurrentUser2, int CurrentlyUsed2)
        {
            int RoomExists = CheckRoom(RoomNum2);
            conn.Open();
            if (RoomExists == 0)
            {
                string query = "Insert into tblUsageCheck(RoomNum, CurrentUser, Duration, CurrentlyUsed) values(@paraRoomNum, @paraCurrentUser, GETDATE(), @paraCurrentlyUsed)";
                SqlCommand InsertCom = new SqlCommand(query, conn);
                InsertCom.Parameters.AddWithValue("@paraRoomNum", RoomNum2);
                InsertCom.Parameters.AddWithValue("@paraCurrentUser", CurrentUser2);
                InsertCom.Parameters.AddWithValue("@paraCurrentlyUsed", CurrentlyUsed2);
                InsertCom.ExecuteNonQuery();
            }
            conn.Close();
        }
    }
}
