package ProductActivity;

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
 * Servlet implementation class GetProducts
 */
@WebServlet("/GetProducts")
public class GetProducts extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetProducts() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String getProducts = "Select * from items";
		
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        try {
        	JSONObject objectOfProductArray = new JSONObject();
    		JSONArray arrayOfProducts = new JSONArray();
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ecommerce?user=root&password=root");
			Statement stmt = con.createStatement();
			ResultSet productsReturned = stmt.executeQuery(getProducts);
			while(productsReturned.next()) {
				JSONObject productJSON = new JSONObject();
				//System.out.println(productsReturned.getString(1) + productsReturned.getString(2) + productsReturned.getInt(3) + productsReturned.getInt(4));
				productJSON.put("productId", productsReturned.getString(1));
				productJSON.put("productLink", productsReturned.getString(2));
				productJSON.put("productPrice", productsReturned.getInt(3));
				productJSON.put("productQuantity", productsReturned.getInt(4));
				productJSON.put("productName", productsReturned.getString(5));
				arrayOfProducts.put(productJSON);
			}
			objectOfProductArray.put("arrayOfProducts", arrayOfProducts);
			response.setContentType("application/json");
			response.getWriter().write(objectOfProductArray.toString());
			
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
