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
 * Servlet implementation class GetTracker
 */
@WebServlet("/GetTracker")
public class GetTracker extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetTracker() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String orderNumber = request.getParameter("orderNumber");
		String getTracker = "Select * from status where orderId='"+ orderNumber +"'";
		
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        try {
        	JSONObject objectOfOrderedArray = new JSONObject();
    		JSONArray arrayOfOrderedItems = new JSONArray();
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ecommerce?user=root&password=root");
			Statement stmt = con.createStatement();
			ResultSet orderedItemsReturned = stmt.executeQuery(getTracker);
			while(orderedItemsReturned.next()) {
				JSONObject productJSON = new JSONObject();
				productJSON.put("orderId", orderedItemsReturned.getInt(2));
				productJSON.put("currentLat", orderedItemsReturned.getString(3));
				productJSON.put("currentLang", orderedItemsReturned.getString(4));
				productJSON.put("destLat", orderedItemsReturned.getString(5));
				productJSON.put("destLong", orderedItemsReturned.getString(6));
				productJSON.put("status", orderedItemsReturned.getString(7));
				arrayOfOrderedItems.put(productJSON);
			}
			objectOfOrderedArray.put("arrayOfProducts", arrayOfOrderedItems);
			response.setContentType("application/json");
			response.getWriter().write(objectOfOrderedArray.toString());
			
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
