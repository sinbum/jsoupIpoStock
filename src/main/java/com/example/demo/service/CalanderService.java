package com.example.demo.service;

import java.io.IOException;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.service.module.DateFormatter;


@Service
public class CalanderService {

	@Autowired
	CrollingDataParse crolling;
	
	@Autowired	
	DateFormatter dateFormatter;

	public CalanderService() {
	}

	/*
	 * 웹데이터 parsing 함수
	 */
	public List<IpoData> webcroll() {

		try {
			// 크롤링후 데이터를 반환합니다.
			//return crolling.crollDatas("2021","11");
			return crolling.crollDatas(dateFormatter.getYear(),dateFormatter.getMonth());
		} catch (IOException e) {
			System.out.println("데이터 크롤링중 문제발생");
			e.printStackTrace();
		}
		return null;
	}

	/*
	 * 제이슨으로 변환하는 함수.
	 */
	public JSONArray toJsondata(List<IpoData> infoList) {
		JSONArray jArray = new JSONArray();
		
		for (IpoData ifo : infoList) {
			
			String json;
			String date = ifo.getDate();
			
			JSONObject inner = new JSONObject();
			inner.put("name", ifo.getName()); 
			inner.put("startDate", parseStartDate(date));
			inner.put("endDate", parseEndDate(date));			
			inner.put("getRefundedDate", ifo.getRefundedDate()); // key는 "age", value는 "25"
			inner.put("getOpenDate", ifo.getOpenDate()); 
			inner.put("getPrice()", ifo.getPrice());			
			
			JSONObject outer = new JSONObject();
			outer.put("IpoData", inner);
			json = outer.toString(); // JSON객체를 String으로 변환		
			System.out.println(json);
			
			jArray.put(outer);

			}
		return jArray;


	}
	
	/*
	 * date를 start와 endDate를 분리하는 함수.
	 * */
	public String parseStartDate(String date) {
		//예시11.01 ~ 11.02 > 11.01	
		if(4 < date.length()) {
			date.trim();
			String subDate = date.substring(0,5);
			System.out.println(subDate);
			return subDate;			
		}
		return null;
	}
	
	/*
	 * date를 start와 endDate를 분리하는 함수.
	 * */
	public String parseEndDate(String date) {
		if(4 < date.length()) {
			date.trim();
			System.out.println("endDate : "+date);
			String subDate = date.substring(8);
			System.out.println("endDate(afterParse) : "+subDate);
			return subDate;
		
		}
		return null;
	}

}
