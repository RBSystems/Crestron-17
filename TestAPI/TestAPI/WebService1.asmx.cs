using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using TestAPI.Models;

namespace TestAPI
{
    /// <summary>
    /// Summary description for WebService1
    /// Just a place to test DAO and api methods--->
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {

        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnStr"].ConnectionString);
        [WebMethod]
        public Projector GetProjector(string RoomNum)
        {
            conn.Open();
            Projector p = new Projector();
            string query = "Select * from tblProjectors where RoomNum = '" + RoomNum + "'";
            SqlDataAdapter da = new SqlDataAdapter(query, conn);
            DataSet ds = new DataSet();
            da.Fill(ds, "tblProjectors");
            int rec_count = ds.Tables["tblProjectors"].Rows.Count;
            if (rec_count > 0)
            {
                DataRow row = ds.Tables["tblProjectors"].Rows[0];
                p.RoomNum = row["RoomNum"].ToString();
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

        [WebMethod]
        public void InsertActionLog(string RoomNum, string AccountID, string Projector_Function)
        {
            conn.Open();
            string query = "Insert into tblActionLog values(@paraRoomNum, @paraAccountID, @paraProjector_Function, GETDATE())";
            SqlCommand InsertCom = new SqlCommand(query, conn);
            InsertCom.Parameters.AddWithValue("@paraRoomNum", RoomNum);
            InsertCom.Parameters.AddWithValue("@paraAccountID", AccountID);
            InsertCom.Parameters.AddWithValue("@paraProjector_Function", Projector_Function);
            InsertCom.ExecuteNonQuery();
            conn.Close();
        }

        [WebMethod]
        public List<ProjectorActionLog> getLogbyRoomNum(string RoomNum)
        {
            conn.Open();
            List<ProjectorActionLog> list = new List<ProjectorActionLog>();
            string query = "Select * from tblActionLog where RoomNum = '" + RoomNum + "'";
            SqlDataAdapter da = new SqlDataAdapter(query, conn);
            DataSet ds = new DataSet();
            da.Fill(ds, "TblProjectorActionLog");
            int rec_cnt = ds.Tables["TblProjectorActionLog"].Rows.Count;
            if (rec_cnt > 0)
            {
                foreach (DataRow row in ds.Tables["TblProjectorActionLog"].Rows)
                {
                    ProjectorActionLog obj = new ProjectorActionLog();
                    obj.RoomNum = row["RoomNum"].ToString();
                    obj.AccountID = row["AccountID"].ToString();
                    obj.Projector_Function = row["Projector_Function"].ToString();
                    obj.TimeStamp = Convert.ToDateTime(row["Timestamp"]);
                    list.Add(obj);
                }
            }
            else
            {
                list = null;
            }
            conn.Close();

            return list;
        }

        [WebMethod]
        public int CheckRoom(string RoomNum)
        {
            conn.Open();
            string query = "select count(*) from tblUsageCheck where RoomNum = '" + RoomNum + "'";
            SqlCommand com = new SqlCommand(query, conn);
            int RoomExists = Convert.ToInt32(com.ExecuteScalar().ToString());
            conn.Close();
            return RoomExists;
        }
        [WebMethod]
        public void InsertUsage(string RoomNum, string CurrentUser, int CurrentlyUsed)
        {
            int RoomExists = CheckRoom(RoomNum);
            conn.Open();
            if (RoomExists == 1)
            {
                string query = "update tblUsageCheck set CurrentUser=@paraCurrentUser, CurrentlyUsed=@paraCurrentlyUsed where RoomNum = '" + RoomNum + "'";
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
    }
}
