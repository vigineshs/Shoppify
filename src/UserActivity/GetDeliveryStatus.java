package UserActivity;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Servlet implementation class GetDeliveryStatus
 */
@WebServlet("/GetDeliveryStatus")
public class GetDeliveryStatus extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetDeliveryStatus() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String orderNumber = request.getParameter("orderNumber");
		String getDeliveryStatus = "Select * from deliverystatus where orderId='"+ orderNumber +"'";
		
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        try {
        	JSONObject objectOfDeliveryStatusArray = new JSONObject();
    		JSONArray arrayOfDeliveryStatuses = new JSONArray();
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ecommerce?user=root&password=root");
			Statement stmt = con.createStatement();
			ResultSet deliveryStatusReturned = stmt.executeQuery(getDeliveryStatus);
			while(deliveryStatusReturned.next()) {
				JSONObject deliveryStatusJSON = new JSONObject();
				deliveryStatusJSON.put("statusId", deliveryStatusReturned.getString(1));
				deliveryStatusJSON.put("orderId", deliveryStatusReturned.getString(2));
				deliveryStatusJSON.put("dest1", deliveryStatusReturned.getString(3));
				deliveryStatusJSON.put("dest2", deliveryStatusReturned.getString(4));
				deliveryStatusJSON.put("dest3", deliveryStatusReturned.getString(5));
				deliveryStatusJSON.put("dest4", deliveryStatusReturned.getString(6));
				deliveryStatusJSON.put("destDate1", deliveryStatusReturned.getString(7));
				deliveryStatusJSON.put("destDate2", deliveryStatusReturned.getString(8));
				deliveryStatusJSON.put("destDate3", deliveryStatusReturned.getString(9));
				arrayOfDeliveryStatuses.put(deliveryStatusJSON);
			}
			objectOfDeliveryStatusArray.put("arrayOfProducts", arrayOfDeliveryStatuses);
			response.setContentType("application/json");
			response.getWriter().write(objectOfDeliveryStatusArray.toString());
			
		} catch (SQLException | JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
