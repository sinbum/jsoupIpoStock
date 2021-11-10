package jsoup;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class MainParse {

	public static void main(String[] args) throws IOException {
		String url = "http://www.ipostock.co.kr/sub03/ipo04.asp?str1=2021&str2=11";

		Document doc = Jsoup.connect(url).get();
		Elements el = doc.getElementsByAttributeValue("id", "print");
		Elements el2 = doc.getElementsByTag("table");
		Elements el3 = doc.getElementsByTag("tbody");
		Elements el4 = doc.getElementsByAttributeValue("width", "780");

		// 공모 회사이름 주소
		String tagDirCoName = "div#print table tbody tr td table tbody tr td table tbody tr td a font";

		// 테이블데이터
		String tagDirCoInfo = "div#print table tbody tr td table tbody tr td table";
		Elements ipoIpoInfoes = doc.select(tagDirCoInfo);
		
		//데이터를 가져옴.
		//Element info = ipoIpoInfoes.get(0);
		Element info = ipoIpoInfoes.get(1);
		Elements elInfo = info.select("table tbody tr");
		
		String refference;
		String date;
		String name;
		String watedPrice;
		String price;
		String wantedTotal;
		String refundedDate;
		String OpenDate;
		String competitionRate;
		String StockCoName;

		

		List<IpoInfo> infoList = new ArrayList<IpoInfo>();
		
		//데이터 객체화.
		for (int i = 0; i < elInfo.size() - 1; i++) {
			
			// !(1차일드가 없을경우) = 차일드가 있을경우.
			// 자식 값이 10개(추천,공모날짜 상장일 등등.. 가 있을경우)
			if (elInfo.get(i).childrenSize() == 10) {
				refference 		= elInfo.get(i).child(0).text();
				date 			= elInfo.get(i).child(1).text();
				name 			= elInfo.get(i).child(2).text();
				watedPrice 		= elInfo.get(i).child(3).text();
				price 			= elInfo.get(i).child(4).text();
				wantedTotal 	= elInfo.get(i).child(5).text();
				refundedDate 	= elInfo.get(i).child(6).text();
				OpenDate 		= elInfo.get(i).child(7).text();
				competitionRate = elInfo.get(i).child(8).text();
				StockCoName 	= elInfo.get(i).child(9).text();

				infoList.add(new IpoInfo(refference, date, name, watedPrice, watedPrice, wantedTotal, refundedDate,OpenDate, competitionRate, StockCoName));
			}
		}
		
		
		//데이터 출력
		for (IpoInfo ifo : infoList) {
			System.out.printf("%s의 공모날짜: %s,환불일: %s, 상장일 : %s 이며 공모가격은 현재 %s 입니다. %n", 
					ifo.getName(), ifo.getDate(),ifo.getRefundedDate(), ifo.getOpenDate(), ifo.getPrice());
			}


//			for (Element row : ipoData)
//	          {
//	            if (!row.select("tbody tr td p").get(0).textNodes().isEmpty())
//	            {
//	              // Caption
//	              Element caption = row.getElementsByTag("caption").get(0);
//	              System.out.println("Caption : " + caption.text());
//	              // 날짜
//	              System.out.println("Date : " + row.getElementsByTag("th").get(0).text());
//	              // 요약
//	             System.out.println("Summary : " );
//	             List<TextNode> textNodes = row.select("tbody > tr > td > p").get(0).textNodes();	             
//	             for(TextNode tn : textNodes)
//	             {
//	               System.out.println("\t" +  tn.text());
//	             }
//	           }
//	         }

	}

}
