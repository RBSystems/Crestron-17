using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace TestAPI.Models
{
    public class CrestronUsageCheckDAO
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnStr"].ConnectionString);
        public List<CrestronUsageCheck> getAppUsage()
        {
            conn.Open();
            List<CrestronUsageCheck> list = new List<CrestronUsageCheck>();
            string query = "Select * from tblUsageCheck where CurrentlyUsed = '1'";
            SqlDataAdapter da = new SqlDataAdapter(query, conn);
            DataSet ds = new DataSet();
            da.Fill(ds, "TblProjectorActionLog");
            int rec_cnt = ds.Tables["TblProjectorActionLog"].Rows.Count;
            if (rec_cnt > 0)
            {
                foreach (DataRow row in ds.Tables["TblProjectorActionLog"].Rows)
                {
                    CrestronUsageCheck obj = new CrestronUsageCheck();
                    obj.RoomNum = row["RoomNum"].ToString();
                    obj.CurrentUser = row["CurrentUser"].ToString();
                    obj.Duration = Convert.ToDateTime(row["Duration"].ToString());
                    obj.CurrentlyUsed = Convert.ToBoolean(row["CurrentlyUsed"]);
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

        public int getAllUsedRooms()
        {
            conn.Open();
            int NumOfRoomsUsed;
            string query = "select count(*) from tblUsageCheck where CurrentlyUsed = '1'";
            SqlCommand com = new SqlCommand(query, conn);
            NumOfRoomsUsed = Convert.ToInt32(com.ExecuteScalar().ToString());
            return NumOfRoomsUsed;
        }
    }
}