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
 * Servlet implementation class GetCartItems
 */
@WebServlet("/GetCartItems")
public class GetCartItems extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetCartItems() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String user = (String) request.getSession().getAttribute("user");
		String getProducts = "Select * from cart where user='"+ user +"'";
		
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        try {
        	JSONObject objectOfCartArray = new JSONObject();
    		JSONArray arrayOfCartItems = new JSONArray();
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ecommerce?user=root&password=root");
			Statement stmt = con.createStatement();
			ResultSet cartItemsReturned = stmt.executeQuery(getProducts);
			while(cartItemsReturned.next()) {
				JSONObject productJSON = new JSONObject();
				productJSON.put("productId", cartItemsReturned.getString(2));
				productJSON.put("productQuantity", cartItemsReturned.getInt(3));
				productJSON.put("productPrice", cartItemsReturned.getInt(4));
				productJSON.put("productLink", cartItemsReturned.getString(5));
				productJSON.put("productName", cartItemsReturned.getString(6));
				productJSON.put("productSubCategory", cartItemsReturned.getString(7));
				productJSON.put("productCategory", cartItemsReturned.getString(8));
				arrayOfCartItems.put(productJSON);
			}
			objectOfCartArray.put("arrayOfProducts", arrayOfCartItems);
			response.setContentType("application/json");
			response.getWriter().write(objectOfCartArray.toString());
			
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
