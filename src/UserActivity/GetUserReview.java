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
 * Servlet implementation class GetUserReview
 */
@WebServlet("/GetUserReview")
public class GetUserReview extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetUserReview() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String orderId = request.getParameter("orderNumber");
		String getProducts = "Select * from orders where orderId='"+ orderId + "'";
		
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
			ResultSet orderedItemsReturned = stmt.executeQuery(getProducts);
			while(orderedItemsReturned.next()) {
				JSONObject productJSON = new JSONObject();
				productJSON.put("orderReviewer", orderedItemsReturned.getString(2));
				productJSON.put("orderReviewStar", orderedItemsReturned.getInt(8));
				productJSON.put("orderReview", orderedItemsReturned.getString(9));
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
