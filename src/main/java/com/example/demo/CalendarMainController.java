package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.service.CalanderService;
import com.example.demo.service.IpoData;

@Controller
public class CalendarMainController {
	
	@Autowired
	CalanderService calanderService;
	
	public CalendarMainController() {	
	}
	
//	@GetMapping(value = "/")
//	public ModelAndView index() {
//		ModelAndView mv = new ModelAndView();
//		
//		mv.addObject("a","a");
//		mv.setViewName("index");		
//		
//		return mv;
//	}
	
	@RequestMapping(value="/")
	public String main(Model model) throws Exception {
		List<IpoData> ipoList= calanderService.webcroll();
		System.out.println(ipoList);
		model.addAttribute("ipoList", ipoList);
	return "index";
	}

}
