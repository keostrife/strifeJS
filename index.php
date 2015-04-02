<?php

	include('application/core/core.strife');
	//include('application/core/connect.strife');
	include('application/models/main.model');

	//instanciate main model
	$strife = new Main_Model();


	/*route with base directory.
	 *Everything else to 404.view
	 */


	$strife_path = substr($_SERVER['REQUEST_URI'], strlen(BASE), strlen($_SERVER['REQUEST_URI']));
	$strife_request = explode('/',$strife_path);

	$strife_request_floor = $strife->getRouteFloor($strife_request);

	//===initialize
	if(method_exists($strife,'init')) $strife->init();

	//1st routing floor handling
	if($strife_request_floor < 2){
		include('routes/first.request');

	/*
	//2nd routing floor handling
	} else if ($strife_request_floor == 2) {
		include('routes/second.request');
	*/
	} else {
		$strife->not_found_404();
	}