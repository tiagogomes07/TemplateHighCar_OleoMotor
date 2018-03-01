
        <?php  	

			 function GetMyConfig($busca)
			 {
				$xml = simplexml_load_file("../../web.config");
				
				$result = $xml->xpath("appSettings/add"); 
				$MyConfig ="";
					foreach($result as $res)
					{
						if($res["key"] == $busca )
						{
							$MyConfig = $res["value"];
							//echo "<br />";
							break;
						}						 

					}
				return $MyConfig;
			 }
			 
			$Configuracao = GetMyConfig("LocalSite");
			//echo $Configuracao;		
			
        ?>

