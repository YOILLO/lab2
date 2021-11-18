package servlets;

import beans.Point;
import beans.PointBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Random;
import java.util.stream.DoubleStream;

public class AreaCheckServlet extends HttpServlet {

    private double y_range[] = {-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0};

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, NumberFormatException, ArithmeticException {
        long startTime = System.nanoTime();
        String x = req.getParameter("xval").trim().replace(",", ".");
        String y = req.getParameter("yval");
        String r = req.getParameter("rval").trim().replace(",", ".");
        int a = 0;
        int b = 10/a;
        if (validateX(x) && validateY(y) && validateR(r)){

            double xValue = Double.parseDouble(x);
            double yValue = Double.parseDouble(y);
            double rValue = Double.parseDouble(r);

            boolean isInside =  insideCircle(xValue, yValue, rValue) ||
                    insideTriangle(xValue, yValue, rValue) ||
                    insideRectangle(xValue, yValue, rValue);

            OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
            String currentTime;

            currentTimeObject = currentTimeObject.minusMinutes(Long.parseLong(req.getParameter("timezone")));
            currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));

            String executionTime = String.valueOf(System.nanoTime() - startTime);

            PointBean raws = (PointBean) req.getSession().getAttribute("table");
            if (raws == null) raws = new PointBean();
            raws.getPoints().add(new Point(xValue, yValue, rValue, currentTime, executionTime, isInside));
            req.getSession().setAttribute("table", raws);
        }
        getServletContext().getRequestDispatcher("/main.jsp").forward(req, resp);
    }

    private boolean validateX(String x) throws NumberFormatException{
        double double_x = Double.parseDouble(x);
        return -3.0 <= double_x && double_x <= 3.0;
    }

    private boolean validateY(String y) throws NumberFormatException{
        double double_y = Double.parseDouble(y);
        return DoubleStream.of(y_range).anyMatch(x -> x == double_y);
    }

    private boolean validateR(String r) throws NumberFormatException{
        double double_r = Double.parseDouble(r);
        return 2.0 <= double_r && double_r <= 5.0;
    }

    private boolean insideCircle(double x, double y, double r){
        return x <= 0 && y <= 0 && x*x + y*y <= (r/2)*(r/2);
    }

    private boolean insideTriangle(double x, double y, double r){
        return x >= 0 && y <= 0 && x<=y*2+r;
    }

    private boolean insideRectangle(double x, double y, double r){
        return x <= 0 && y >= 0 && x >= -r/2 && y <= r;
    }
}
