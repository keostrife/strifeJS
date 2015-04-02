<?php
	
	include('application/core/core.strife');
	//include('application/core/connect.strife');
	include('application/models/form.model');

	//instanciate form model
	$form_handler = new Form_Model();

	//===initialize
	if(method_exists($form_handler,'init')) $form_handler->init();

	//disable error notice for "undefined index"
	error_reporting(E_ALL ^ E_NOTICE);

	if(isset($_POST['submit_home'])){
		if(!$form_handler->validate('required|alphanumeric',$_POST['name'])){
			echo $form_handler->getError();
		}
		$form_handler->validate('required|length|1',$_POST['checkbox']);
		//echo $form_handler->getError();
		echo $form_handler->filter('url|xss', $_POST['name']);
	} else {
		header("location: /");
	}
	
?>