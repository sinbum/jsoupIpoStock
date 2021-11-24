package com.example.demo;

import java.util.Date;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
	
//	@Autowired
//	CalanderService service;
//	
//	@Autowired
//	IpoData ipodata;
	
	
	@GetMapping("/api/hello")
	public String hello() {
		return "안녕하세요. 현재시각은 "+new Date() + "입니다. \n";
	}

	
	
//	@GetMapping(value = "/ipoindex")
//	public String index() {
//		List <IpoData> datas = service.webcroll();
//		return service.toJsondata(datas).toString();
//	}
}

