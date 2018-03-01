<?php

    //$imagePath = "/inetpub/wwwroot/Ibgc/Certificacao";
   // include 'get_path.php';
    $imagePath = "C:/Projetos/Site_HigCar/HighCarCore/MVC_HighCar/pages/temp/";

    $deleteFile =  $imagePath.$_GET['filename'];

  
    unlink ($deleteFile);

?>
