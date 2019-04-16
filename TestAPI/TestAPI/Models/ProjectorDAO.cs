using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace TestAPI.Models
{
    public class ProjectorDAO
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnStr"].ConnectionString);
        public List<ProjectorActionLog> getLogbyRoomNum(string RoomNum)
        {
            conn.Open();
            List<ProjectorActionLog> list = new List<ProjectorActionLog>();
            string query = "Select * from tblActionLog where RoomNum = '" + RoomNum + "' order by Timestamp desc";
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
                    obj.Latitude = Convert.ToDouble(row["Latitude"]);
                    obj.Longitude = Convert.ToDouble(row["Longitude"]);
                    obj.BSSID = row["SSID"].ToString();
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

        public void deleteAllLog()
        {
            conn.Open();
            string query = "Delete from tblActionLog";
            SqlCommand DeleteCom = new SqlCommand(query, conn);
            DeleteCom.ExecuteNonQuery();
            conn.Close();
        }

        public int getAllEventLog()
        {
            conn.Open();
            int NumOfEventLogs;
            string query = "select count(*) from tblActionLog";
            SqlCommand com = new SqlCommand(query, conn);
            NumOfEventLogs = Convert.ToInt32(com.ExecuteScalar().ToString());
            return NumOfEventLogs;
        }
    }
}