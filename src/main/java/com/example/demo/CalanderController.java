package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.CalanderService;
import com.example.demo.service.IpoData;


@RestController
public class CalanderController {
	
	@Autowired
	CalanderService service;
	
	@Autowired
	IpoData ipodata;

	public CalanderController() {
		// TODO Auto-generated constructor stub
	}
	
	@RequestMapping(value = "/ipoindex", method=RequestMethod.GET)
	public String index() {
		List <IpoData> datas = service.webcroll();
		return service.toJsondata(datas).toString();
	}

}
