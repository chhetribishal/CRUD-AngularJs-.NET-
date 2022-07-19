var app = angular.module("myApp", []);
app.controller("myCntrl", function ($scope, $http) {
    $scope.GetAllProduct = function () {
        $http({
            method: "get",
            url: "http://localhost:50082/Home/GetAllProduct"
        }).then(function (response) {
            $scope.Product = response.data
        }, function () {
            alert("Error Occour!");
        }
        )
    };

    $scope.InsertProduct = function () {
     
        var type = document.getElementById("insertProd").getAttribute("value");
        if (type == "Submit") { 
            $scope.Product = {};
            $scope.Product.ProductName = $scope.pname;
            $scope.Product.Price = $scope.price;
            $scope.Product.Qty = $scope.qty;
            $scope.Product.Remarks = $scope.remarks;
            $http({
                method: "post",
                url: "http://localhost:50082/Home/InsertProductRecord",
                datatype: "json",
                data: JSON.stringify($scope.Product)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllProduct()
                $scope.pname = " ";
                $scope.price = " ";
                $scope.qty = " ";
                $scope.remarks = " ";
            })
        } else {

            $scope.Product = {};
            $scope.Product.ProductName = $scope.pname;
            $scope.Product.ProductID = sessionStorage.getItem("PID");
            $scope.Product.Price = $scope.price;
            $scope.Product.Qty = $scope.qty;
            $scope.Product.Remarks = $scope.remarks;
            $http({
                method: "post",
                url: "http://localhost:50082/Home/UpdateProductRecord",
                datatype: "json",
                data: JSON.stringify($scope.Product)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllProduct();
                $scope.pname = " ";
                $scope.price = " ";
                $scope.qty = " ";
                $scope.remarks = " ";
                document.getElementById("insertProd").setAttribute("value", "Submit");
            })
        }
    };

    $scope.UpdateProduct = function (pd) {
       
        sessionStorage.setItem("PID", pd.ProductID);
        $scope.pname = pd.ProductName;
        $scope.price = pd.Price;
        $scope.qty = pd.Qty;
        $scope.remarks = pd.Remarks;
        document.getElementById("insertProd").setAttribute("value", "Update");
    };

 
    $scope.DeleteProduct = function (pd) {
       
        $http({
            method: "post",
            url: "http://localhost:50082/Home/DeleteProduct",
            datatype: "json",
            data: JSON.stringify(pd)
        }).then(function (response) {
            alert("Deleted Successfully");
            $scope.GetAllProduct();
        })
    };
});