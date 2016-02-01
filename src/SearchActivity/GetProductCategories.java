package SearchActivity;

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
 * Servlet implementation class GetProductCategories
 */
@WebServlet("/GetProductCategories")
public class GetProductCategories extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetProductCategories() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String getCategories = "Select DISTINCT productcategory from items";
		System.out.println("y");
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        try {
        	JSONObject objectOfProductCategoriesArray = new JSONObject();
    		JSONArray arrayOfProductCategories = new JSONArray();
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ecommerce?user=root&password=root");
			Statement stmt = con.createStatement();
			ResultSet productCategoriesReturned = stmt.executeQuery(getCategories);
			while(productCategoriesReturned.next()) {
				JSONObject productJSON = new JSONObject();
				productJSON.put("productCategory", productCategoriesReturned.getString(1));
				arrayOfProductCategories.put(productJSON);
			}
			objectOfProductCategoriesArray.put("arrayOfProductCategories", arrayOfProductCategories);
			response.setContentType("application/json");
			response.getWriter().write(objectOfProductCategoriesArray.toString());
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
