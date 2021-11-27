package com.example.demo.service;

import org.springframework.stereotype.Component;

@Component
public class IpoData {	
	//추천 공모일정 종목명 희망공모가 공모가 공모금액 환불일 상장일 경쟁율 주간사
	
	String refference;
	String date;
	String name;
	String wantedPrice;
	String price;
	String wantedTotal;
	String refundedDate;
	String openDate;
	String competitionRate;
	String StockCoName;
	
	public IpoData() {
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String toString() {
		return "IpoData [refference=" + refference + ", date=" + date + ", name=" + name + ", wantedPrice="
				+ wantedPrice + ", price=" + price + ", wantedTotal=" + wantedTotal + ", refundedDate=" + refundedDate
				+ ", openDate=" + openDate + ", competitionRate=" + competitionRate + ", StockCoName=" + StockCoName
				+ "]";
	}

	public IpoData(String refference, String date, String name, String wantedPrice, String price, String wantedTotal,
			String refundedDate, String openDate, String competitionRate, String stockCoName) {
		super();
		this.refference = refference;
		this.date = date;
		this.name = name;
		this.wantedPrice = wantedPrice;
		this.price = price;
		this.wantedTotal = wantedTotal;
		this.refundedDate = refundedDate;
		this.openDate = openDate;
		this.competitionRate = competitionRate;
		StockCoName = stockCoName;
	}

	public String getWantedPrice() {
		return wantedPrice;
	}

	public void setWantedPrice(String wantedPrice) {
		this.wantedPrice = wantedPrice;
	}

	public String getRefference() {
		return refference;
	}
	public void setRefference(String refference) {
		this.refference = refference;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getWantedTotal() {
		return wantedTotal;
	}
	public void setWantedTotal(String wantedTotal) {
		this.wantedTotal = wantedTotal;
	}
	public String getRefundedDate() {
		return refundedDate;
	}
	public void setRefundedDate(String refundedDate) {
		this.refundedDate = refundedDate;
	}
	public String getOpenDate() {
		return openDate;
	}
	public void setOpenDate(String openDate) {
		this.openDate = openDate;
	}
	public String getCompetitionRate() {
		return competitionRate;
	}
	public void setCompetitionRate(String competitionRate) {
		this.competitionRate = competitionRate;
	}
	public String getStockCoName() {
		return StockCoName;
	}
	public void setStockCoName(String stockCoName) {
		StockCoName = stockCoName;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}


	
	
	
	
	
	
	
	
	
}
