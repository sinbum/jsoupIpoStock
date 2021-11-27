package com.example.demo.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

@Component
public class CrollingDataParse {
	
	public CrollingDataParse() {		
	}

	
	/*
	 * 크롤링한 ipo데이터를 array리스트에 담아 리스트 형식으로 반환합니다.
	 * */
public List<IpoData> crollDatas(String year,String month) throws IOException {		
	
		String url = "http://www.ipostock.co.kr/sub03/ipo04.asp?str1="+year+"&str2="+month;
		
		System.out.println("url : "+ url);

		Document doc = Jsoup.connect(url).get();		

		// 테이블데이터
		String tagDirCoInfo = "div#print table tbody tr td table tbody tr td table";
		Elements ipoIpoInfoes = doc.select(tagDirCoInfo);
		
		//데이터를 가져옴.
		//Element info = ipoIpoInfoes.get(0);
		Element info = ipoIpoInfoes.get(1);
		Elements elInfo = info.select("table tbody tr");


		List<IpoData> infoList = new ArrayList<IpoData>();
		//데이터 객체화.
		for (int i = 0; i < elInfo.size() - 1; i++) {
			
			// !(1차일드가 없을경우) = 차일드가 있을경우.
			// 자식 값이 10개(추천,공모날짜 상장일 등등.. 가 있을경우)
			if (elInfo.get(i).childrenSize() == 10) {
				IpoData ipodata = new IpoData();
				ipodata.setRefference		(elInfo.get(i).child(0).text());
				ipodata.setDate				(elInfo.get(i).child(1).text());
				ipodata.setName				(elInfo.get(i).child(2).text());
				ipodata.setWantedPrice		(elInfo.get(i).child(3).text());
				ipodata.setPrice			(elInfo.get(i).child(4).text());
				ipodata.setWantedTotal		(elInfo.get(i).child(5).text());
				ipodata.setRefundedDate		(elInfo.get(i).child(6).text());
				ipodata.setOpenDate			(elInfo.get(i).child(7).text());
				ipodata.setCompetitionRate	(elInfo.get(i).child(8).text());
				ipodata.setStockCoName		(elInfo.get(i).child(9).text());
				

				infoList.add(ipodata);
			}
		}
		//데이터 출력
//		for (IpoData ifo : infoList) {
//			System.out.printf("%s의 공모날짜: %s,환불일: %s, 상장일 : %s 이며 공모가격은 현재 %s 입니다. %n", 
//					ifo.getName(), ifo .getDate(),ifo.getRefundedDate(), ifo.getOpenDate(), ifo.getPrice());
//			}	

		return infoList;
	}



}
