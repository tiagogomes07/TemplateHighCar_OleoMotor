//var apiUrlServer = "http://52.54.242.89:88";
var apiUrlServer = "http://localhost:61422";

var app = angular.module('app', []) //'$filter' , $location
app.controller("Control", function ($scope) {
        //$scope.$route = $route;
       // $scope.$location = $location;    
});
app.controller("controller_produtos", function ($scope, $http, $anchorScroll) //, $location
{
         //VARIAVEIS DE CONTROLLER
        $scope.Produtos = [];
        $scope.produto;

        cropperHeader = null;
        LoadImagemProduto = function(imgURL) 
        {
            
            if(cropperHeader) 
            {
                cropperHeader.destroy();
            }

            var cropperOptions = 
            {                uploadUrl: "/croppic/img_save_to_file.php",
                cropUrl: '/croppic/img_crop_to_file.php',
                imgEyecandy: false,
                // loaderHtml: '<div class="loader bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div> ',
                onBeforeImgUpload: function () { console.log('onBeforeImgUpload') },
                onAfterImgUpload: function () { console.log('onAfterImgUpload') },
                onImgDrag: function () { console.log('onImgDrag') },
                onImgZoom: function () { console.log('onImgZoom') },
                onBeforeImgCrop: function () { console.log('onBeforeImgCrop') },
                onAfterImgCrop: function () { console.log('onAfterImgCrop') },
                onReset: function () { console.log('onReset') },
                onError: function (errormessage) { console.log('onError:' + errormessage) },
                outputUrlId:'myOutputId',
                loadPicture: imgURL,
            }

            cropperHeader = new Croppic('yourId', cropperOptions);

            $("#yourId img").css("width","275px").css("height","312px");

            console.log("Carregado Croppic");
    }


    //SECAO CONTROLE BARRA DE ROLAGEM 
    $scope.gotoBottom = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('bottom');

        // call $anchorScroll()
        $anchorScroll();
    };

    //Operaçoes de CRUD  
    $scope.GetProdutos = function(){
        $http({
        method: 'GET',
        url: apiUrlServer + "/api/produtos",
        dataType: "json",
        headers: {'Content-Type': 'application/json'},
        error: { function(response){ console.log("Erro") }}
        })
        .then(function(response){
            console.log("Dados produtos carregados");
            $scope.Produtos = response.data;   
            console.log(response.data);
        })
          
    };

    $scope.SalvarProduto = function(){
        var imagemURL = $("#myOutputId").val().split("/")[2];
        var ArrayImagem = []; 
        var checar =  Validar();
        if(checar  == false){
            return
        }

        ArrayImagem.push({ 'urlImagem': imagemURL });
        var dados = $scope.produto;
        dados.Imagem = ArrayImagem;
        $http({
        method: 'POST',
        url: apiUrlServer + "/api/produtos",
        data: JSON.stringify(dados),
        dataType: "json",
        headers: {'Content-Type': 'application/json'}
        }).then(function(){
            console.log("Dados enviados");
            alert("Salvo com sucesso");
            $("#btnFechar").trigger("click");
            $scope.GetProdutos();
        })
    };
    
    $scope.EditarProduto = function(){
        var imagemURL = $("#myOutputId").val().split("/")[2];
        $scope.produto.Imagem[0].urlImagem = imagemURL;
        var dados = $scope.produto;
      
        var checar =  Validar();
        if(checar  == false){
            return
        }

        $http({
        method: 'PUT',
        url: apiUrlServer + "/api/produtos",
        data: JSON.stringify(dados),
        dataType: "json",
        headers: {'Content-Type': 'application/json'}
        }).then(function(){
            console.log("Dados enviados");
            alert("Alterado com sucesso");
            $scope.GetProdutos();
            $("#btnFechar").trigger("click");
            
        })
    };
        
    $scope.DeleteProduto = function(){
        var dados = $scope.produto;
        $http({
        method: 'DELETE',
        url: apiUrlServer + "/api/produtos",
        data: JSON.stringify(dados),
        dataType: "json",
        headers: {'Content-Type': 'application/json'}
    
        }).then(function(){
            alert("Deletado com sucesso");
            $scope.GetProdutos();
            $("#btnFechar").trigger("click");
            
        })
    };
    
    //METODOS EXECUTADOS NA INICIALIZACAO DO CODIGO xxx
    $scope.GetProdutos();

    //MODOS de ABERTURA DE JANELA MODAL
    $scope.OpenModalDelete = function(_produto){
        $scope.produto = _produto;
        LoadImagemProduto("Imagens_upload/" + _produto.Imagem[0].urlImagem);
        $scope.saveMode = false;
        $scope.deleteMode = true;        
        $scope.editMode = false;
        $("#myModal").modal("show");       

    };

    $scope.OpenModalCreate = function(){
        LoadImagemProduto(null);  
        $scope.saveMode = true;
        $scope.deleteMode = false;
        $scope.editMode = false;
        $scope.produto = null;//Limpar qualquer objeto que esteja em memoria
        $("#myModal").modal("show");           
    };

    $scope.OpenModalEdit = function(_produto){ 
       
        $scope.produto = _produto;
        LoadImagemProduto("Imagens_upload/" + _produto.Imagem[0].urlImagem);
        $scope.saveMode = false;
        $scope.deleteMode = false;
        $scope.editMode = true;
        $("#myModal").modal("show");   
    };


    //VALIDAÇÕES
    function Validar(){

        if($(".croppedImg").attr("src") == undefined)
        {
            alert("É preciso uma imagem para representar o produto");
            return false;
        }
        if($scope.produto.Nome == undefined){
            alert("O nome do produto precisa ser preenchido");
            return false;
        }
        if($scope.produto.Detalhes == undefined){
            alert("O Detalhes do produto precisam ser preenchidos");
            return false;
        }
        if($scope.produto.Preco == undefined){
            alert("O Preço precisa ser preenchido");
            return false;
        }
        else{

            try {
                $scope.produto.Preco = $scope.produto.Preco.replace(',', '.');

                $scope.produto.Preco =  parseFloat($scope.produto.Preco)
            } catch (error) {
                alert("O Preço está no formato incorreto");
                return false;
            }
          
        }
        

        return true;
    } 
});
   
app.controller("controller_materias", function($scope, $http){
        console.log("controller materias carregado");
        //VARIAVEIS DE CONTROLLER
        $scope.Materias = [];
        $scope.Materia;

        //MODOS de ABERTURA DE JANELA MODAL
        $scope.OpenModalMaterias = function(){
           $scope.saveModeMateria = true;
           $scope.editModeMateria = false;
           $scope.deleteModeMateria = false;
           $scope.materia = null;
           $("#Modalmateriais").modal("show"); 
           LoadImagemMateria(null);
        }

        $scope.OpenMateriaEdit = function(materia){
            $scope.materia = materia;
            
            if(materia.Imagem[0] != undefined)
            {   var urlImagem = materia.Imagem[0].urlImagem;
                LoadImagemMateria("Imagens_upload/" + urlImagem ); }
            else{ LoadImagemMateria(null );  } 

            $scope.saveModeMateria = false;
            $scope.editModeMateria = true;
            $scope.deleteModeMateria = false;
            $("#Modalmateriais").modal("show");                        
        }

        $scope.OpenMateriaDelete = function(materia){

            if(materia.Imagem[0] != undefined)
            {   var urlImagem = materia.Imagem[0].urlImagem;
                LoadImagemMateria("Imagens_upload/" + urlImagem ); }
            else{ LoadImagemMateria(null );  } 

            $scope.materia = materia;
            $scope.saveModeMateria = false;
            $scope.editModeMateria = false;
            $scope.deleteModeMateria = true;
            $("#Modalmateriais").modal("show");
        }
       
        //Operaçoes de CRUD  
        $scope.GetMaterias = function(){
            $http({
            method: 'GET',
            url: apiUrlServer + "/api/materias",
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
            error: { function(response){ console.log("Erro") }}
            })
            .then(function(response){
                console.log("Dados de materias carregados");
                $scope.materias = response.data;   
            })
            
        };

        $scope.GetMaterias();

        $scope.SalvarMateria = function(materia){

            var imagemURL = $("#Out_Put_photo_Materia").val().split("/")[2];
            var ArrayImagem = []; 
            ArrayImagem.push({ 'urlImagem': imagemURL });
            materia.Imagem = ArrayImagem;

            $http({
            method: 'POST',
            url: apiUrlServer + "/api/materias",
            data: JSON.stringify(materia),
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
            error: { function(response){ console.log("Erro") }}
            })
            .then(function(response){
                console.log("Dados de materias enviados com sucessos");
                alert("Salvo com sucesso");                
                $scope.Materias = response.data; 
                $scope.GetMaterias(); 
                $("#Modalmateriais").modal("hide");
            })
  
            console.log("materia salva");

        }


        $scope.EditarMateria = function(materia){
            var imagemURL = $("#Out_Put_photo_Materia").val().split("/")[2];
            var ArrayImagem = []; 
            ArrayImagem.push({ 'urlImagem': imagemURL });
            materia.Imagem = ArrayImagem;
            $http({
            method: 'PUT',
            url: apiUrlServer + "/api/materias",
            data: JSON.stringify(materia),
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
            error: { function(response){ console.log("Erro") }}
            })
            .then(function(response){
                alert("Editado com sucesso");
                $scope.GetMaterias(); 
                $("#Modalmateriais").modal("hide");
            })
            console.log("Materia ediatada");  
        }

        $scope.DeleteMateria = function(materia){            
            $http({
            method: 'DELETE',
            url: apiUrlServer + "/api/materias",
            data: JSON.stringify(materia),
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
            error: { function(response){ console.log("Erro") }}
            })
            .then(function(response){
                console.log("Dados de materias enviados com sucessos");
                $scope.Materias = response.data; 
                alert("Deletado com sucesso");
                $scope.GetMaterias(); 
                $("#Modalmateriais").modal("hide");
            })
            //console.log("Deletar Material");  
        }

        cropperHeader = null;
        LoadImagemMateria = function(imgURL) {
            
            if(cropperHeader) {
                cropperHeader.destroy();
            }

            var cropperOptionsMat = {
                uploadUrl: "/croppic/img_save_to_file.php",
                cropUrl: '/croppic/img_crop_to_file.php',
                imgEyecandy: false,
                // loaderHtml: '<div class="loader bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div> ',
                onBeforeImgUpload: function () { console.log('onBeforeImgUpload') },
                onAfterImgUpload: function () { console.log('onAfterImgUpload'); AposCarregarAjustarCSS() },
                onImgDrag: function () { console.log('onImgDrag') },
                onImgZoom: function () { console.log('onImgZoom') },
                onBeforeImgCrop: function () { console.log('onBeforeImgCrop') },
                onAfterImgCrop: function () { console.log('onAfterImgCrop') },
                onReset: function () { console.log('onReset') },
                onError: function (errormessage) { console.log('onError:' + errormessage) },
                outputUrlId:'Out_Put_photo_Materia',
                loadPicture: imgURL,
            }

            cropperHeader = new Croppic('photo_Materia', cropperOptionsMat);

            $("#photo_Materia img").css("width","275px").css("height","312px")

            function AposCarregarAjustarCSS(){

              //  $(".cropImgWrapper").css("width","275px").css("height","312px")
              //  ;

            }


           

            console.log("Carregado Croppic");
    }

        

})


        //app.config(function($routeProvider, $locationProvider) {
        
        //    $routeProvider
        //    .when("/", {
        //        templateUrl : "home.html",
        //        controller: 'controller_produtos'
        //    })
        //    .when("/Sobrenos", {
        //        templateUrl : "sobrenos.html",
        //    // controller: 'myController'
        //    })
        //    .when("/Materias", {
        //        templateUrl : "materias.html",
        //        controller: 'controller_materias'
        //    })
        //    .when("/Localizacao", {
        //        templateUrl : "localizacao.html",
        //        //controller: 'myController'
        //    })
        //    .otherwise({
        //        redirectTo : '/home.html'
        //    });
            
        //    $locationProvider.html5Mode(true);
        //}

        //);




