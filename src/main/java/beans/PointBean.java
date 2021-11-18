package beans;

import java.util.ArrayList;
import java.util.List;

public class PointBean {
    private List<Point> points;

    public PointBean(){
        points = new ArrayList<>();
    }

    public List<Point> getPoints() {
        return points;
    }
}
