<?php
/*
*	!!! THIS IS JUST AN EXAMPLE !!!, PLEASE USE ImageMagick or some other quality image processing libraries
*/
$imgUrl = $_POST['imgUrl'];
// original sizes
$imgInitW = $_POST['imgInitW'];
$imgInitH = $_POST['imgInitH'];
// resized sizes
$imgW = $_POST['imgW'];
$imgH = $_POST['imgH'];
// offsets
$imgY1 = $_POST['imgY1'];
$imgX1 = $_POST['imgX1'];
// crop box
$cropW = $_POST['cropW'];
$cropH = $_POST['cropH'];
// rotation angle
$angle = $_POST['rotation'];

$jpeg_quality = 100;

$imagePath = "C:/Projetos/Site_HigCar/HighCarCore/MVC_HighCar/pages/";
$imgURL = "croppic/temp/";
$input_filename = $imagePath.$imgUrl;

$ofile_name = "croppedImg_".rand();
//$output_filename = $imagePath.$imgURL.$ofile_name; 
$output_filename = "C:/Projetos/Site_HigCar/HighCarCore/MVC_HighCar/pages/Imagens_upload/".$ofile_name; 

$what = getimagesize($input_filename);

switch(strtolower($what['mime']))
{
    case 'image/png':
        $img_r = imagecreatefrompng($input_filename);
		$source_image = imagecreatefrompng($input_filename);
		$type = '.png';
        break;
    case 'image/jpeg':
        $img_r = imagecreatefromjpeg($input_filename);
		$source_image = imagecreatefromjpeg($input_filename);
		error_log("jpg");
		$type = '.jpeg';
        break;
    case 'image/gif':
        $img_r = imagecreatefromgif($input_filename);
		$source_image = imagecreatefromgif($input_filename);
		$type = '.gif';
        break;
    default: die('image type not supported');
}


//Check write Access to Directory

if(!is_writable(dirname($input_filename))){
	$response = Array(
	    "status" => 'error',
	    "message" => 'Can`t write cropped File'
    );	
}else{

    // resize the original image to size of editor
    $resizedImage = imagecreatetruecolor($imgW, $imgH);
	imagecopyresampled($resizedImage, $source_image, 0, 0, 0, 0, $imgW, $imgH, $imgInitW, $imgInitH);
    


	
	
	
	
	// rotate the rezized image
    $rotated_image = imagerotate($resizedImage, -$angle, 0);
    // find new width & height of rotated image
    $rotated_width = imagesx($rotated_image);
    $rotated_height = imagesy($rotated_image);
    // diff between rotated & original sizes
    $dx = $rotated_width - $imgW;
    $dy = $rotated_height - $imgH;
    // crop rotated image to fit into original rezized rectangle
	$cropped_rotated_image = imagecreatetruecolor($imgW, $imgH);
	imagecolortransparent($cropped_rotated_image, imagecolorallocate($cropped_rotated_image, 0, 0, 0));
	imagecopyresampled($cropped_rotated_image, $rotated_image, 0, 0, $dx / 2, $dy / 2, $imgW, $imgH, $imgW, $imgH);
	// crop image into selected area
	$final_image = imagecreatetruecolor($cropW, $cropH);
	imagecolortransparent($final_image, imagecolorallocate($final_image, 0, 0, 0));
	imagecopyresampled($final_image, $cropped_rotated_image, 0, 0, $imgX1, $imgY1, $cropW, $cropH, $cropW, $cropH);
	
	// imagesavealpha($final_image, true);
    // $trans_colour = imagecolorallocatealpha($final_image, 0, 0, 0, 127);
    // imagefill($png, 0, 0, $trans_colour);
	// 	function setTransparency($new_image,$image_source) 
	// 	{ 
			
	// 			$transparencyIndex = imagecolortransparent($image_source); 
	// 			$transparencyColor = array('red' => 208, 'green' => 162, 'blue' => 50); 
				
	// 			// if ($transparencyIndex >= 0) { 
	// 			// 	$transparencyColor    = imagecolorsforindex($image_source, $transparencyIndex);    
	// 			// } 
				
	// 			$transparencyIndex    = imagecolorallocate($new_image, $transparencyColor['red'], $transparencyColor['green'], $transparencyColor['blue']); 
	// 			imagefill($new_image, 0, 0, $transparencyIndex); 
	// 			imagecolortransparent($new_image, $transparencyIndex); 
	// 	}

	// $new_image = imagecreatetruecolor($cropW, $cropH); 
	// setTransparency($new_image, $final_image);

	
	
	
	// finally output png image
	//imagepng($final_image, $output_filename.$type, $png_quality);
	imagejpeg($final_image, $output_filename.$type, $jpeg_quality);
	$response = Array(
	    "status" => 'success',
	    // "url" => $imgURL.$ofile_name.$type,
		"url" =>  '../Imagens_upload/'.$ofile_name.$type
    );


	unlink($input_filename);
		
}
print json_encode($response);