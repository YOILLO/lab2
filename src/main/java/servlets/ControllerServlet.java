package servlets;

import beans.PointBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, NumberFormatException {
        if(req.getParameter("xval") != null && req.getParameter("yval") != null
                && req.getParameter("rval") != null) {
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(req, resp);
        }
        else if (req.getParameter("clear") != null){
            PointBean beans = (PointBean) req.getSession().getAttribute("table");
            if (beans == null) beans = new PointBean();
            beans.getPoints().clear();
            req.getSession().setAttribute("table", beans);
            getServletContext().getRequestDispatcher("/main.jsp").forward(req, resp);
        }
        else {
            getServletContext().getRequestDispatcher("/main.jsp").forward(req, resp);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/main.jsp").forward(req, resp);
    }
}
