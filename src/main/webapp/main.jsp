<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="lib"%>
<jsp:useBean id="table" class="beans.PointBean" scope="session" />
<html>
    <head>
        <title>web1</title>
        <link rel="icon" href="img/frog.jpg">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>
        <table id="main_table">
            <tr id="head-element" class="vertical-elements">
                <td id="left-header">
                    Кальвияйнен Ярослав, P3232
                </td>
                <td id="right-header">
                    Вариант 32167
                </td>
            </tr>
            <tr class="vertical-elements" id="middle-headers">
                <td>
                    График
                </td>
                <td>
                    Данные
                </td>
            </tr>
            <tr class="vertical-elements" id="middle-content">
                <td id="graph_td">
                    <object class="result-graph" type="image/svg+xml", data="img/graph.svg">
                        <img src="img/grafic.png" alt="График не найден" width="220" height="220">
                    </object>
                    <canvas class="graph_canvas" width="220" height="220">Интерктивная область графика</canvas>
                </td>
                <td>
                    <form id="input-form" action="" method="GET">
                        <table id="input-grid">
                            <!-- X Value -->
                            <tr>
                                <td class="input-grid-label">
                                    <label>X:</label>
                                </td>

                                <td class="input-grid-value">
                                    <input id="x-textinput" type="text" name="xval" maxlength="5" autocomplete="off" placeholder="Число от -3 до 3">
                                </td>
                            </tr>

                            <!-- Y Value -->
                            <tr>
                                <td class="input-grid-label">
                                    <label>Y:</label>
                                </td>

                                <td class="input-grid-value">
                                    <div class="center-labeled">
                                        <label class="negative-labled y-box-label" for="y-checkbox1">-4</label>
                                        <input class="y-checkbox" id="y-checkbox1" type="checkbox" name="yval" value="-4">
                                    </div>

                                    <div class="center-labeled">
                                        <label class="negative-labled y-box-label" for="y-checkbox2">-3</label>
                                        <input class="y-checkbox" id="y-checkbox2" type="checkbox" name="yval" value="-3">
                                    </div>

                                    <div class="center-labeled">
                                        <label class="negative-labled y-box-label" for="y-checkbox3">-2</label>
                                        <input class="y-checkbox" id="y-checkbox3" type="checkbox" name="yval" value="-2">
                                    </div>

                                    <div class="center-labeled">
                                        <label class="negative-labled y-box-label" for="y-checkbox4">-1</label>
                                        <input class="y-checkbox" id="y-checkbox4" type="checkbox" name="yval" value="-1">
                                    </div>

                                    <div class="center-labeled">
                                        <label class="y-box-label" for="y-checkbox5">0</label>
                                        <input class="y-checkbox" id="y-checkbox5" type="checkbox" name="yval" value="0">
                                    </div>
                                    <div class="center-labeled">
                                        <label class="y-box-label" for="y-checkbox6">1</label>
                                        <input class="y-checkbox" id="y-checkbox6" type="checkbox" name="yval" value="1">
                                    </div>
                                    <div class="center-labeled">
                                        <label class="y-box-label" for="y-checkbox7">2</label>
                                        <input class="y-checkbox" id="y-checkbox7" type="checkbox" name="yval" value="2">
                                    </div>
                                    <div class="center-labeled">
                                        <label class="y-box-label" for="y-checkbox8">3</label>
                                        <input class="y-checkbox" id="y-checkbox8" type="checkbox" name="yval" value="3">
                                    </div>
                                    <div class="center-labeled">
                                        <label class="y-box-label" for="y-checkbox9">4</label>
                                        <input class="y-checkbox" id="y-checkbox9" type="checkbox" name="yval" value="4">
                                    </div>
                                </td>
                            </tr>

                            <!-- R Value -->
                            <tr>
                                <td class="input-grid-label">
                                    <label>R:</label>
                                </td>

                                <td class="input-grid-value">
                                    <input id="r-textinput" type="text" name="rval" maxlength="5" autocomplete="off" placeholder="Число от 2 до 5">
                                </td>
                            </tr>

                            <!-- Buttons -->
                            <tr>
                                <td colspan="2">
                                    <div class="buttons">
                                        <input class="button" type="submit" value="Submit">
                                        <input class="button" type="reset" value="Reset">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </form>
                </td>
            </tr>
            <tr class="vertical-elements">
                <td colspan="2">
                    <table  id="result-table">
                        <tr id="header-row">
                            <td class="table-collumn">X</td>
                            <td class="table-collumn">Y</td>
                            <td class="table-collumn">R</td>
                            <td class="table-collumn">Время запроса</td>
                            <td class="table-collumn">Время выполнения запроса</td>
                            <td class="table-collumn">Результат запроса</td>
                        </tr>
                        <lib:forEach var="raw" items="${table.points}">
                            <tr>
                                <th>${raw.x_val}</th>
                                <th>${raw.y_val}</th>
                                <th>${raw.r_val}</th>
                                <th>${raw.current_time}</th>
                                <th>${raw.execution_time}</th>
                                <th>${raw.result ? "внутри" : "снаружи"}</th>
                            </tr>
                        </lib:forEach>
                    </table>
                </td>
            </tr>
        </table>

        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="js/script.js"></script>

    </body>
</html>