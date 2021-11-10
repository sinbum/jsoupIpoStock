package jsoup;

public class IpoInfo {	
	//추천 공모일정 종목명 희망공모가 공모가 공모금액 환불일 상장일 경쟁율 주간사
	
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
	
	public IpoInfo() {
		// TODO Auto-generated constructor stub
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
	public String getWatedPrice() {
		return watedPrice;
	}
	public void setWatedPrice(String watedPrice) {
		this.watedPrice = watedPrice;
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
		return OpenDate;
	}
	public void setOpenDate(String openDate) {
		OpenDate = openDate;
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

	public IpoInfo(String refference, String date, String name, String watedPrice, String price, String wantedTotal,
			String refundedDate, String openDate, String competitionRate, String stockCoName) {
		super();
		this.refference = refference;
		this.date = date;
		this.name = name;
		this.watedPrice = watedPrice;
		this.price = price;
		this.wantedTotal = wantedTotal;
		this.refundedDate = refundedDate;
		OpenDate = openDate;
		this.competitionRate = competitionRate;
		StockCoName = stockCoName;
	}

	@Override
	public String toString() {
		return "IpoInfo [refference=" + refference + ", date=" + date + ", name=" + name + ", watedPrice=" + watedPrice
				+ ", price=" + price + ", wantedTotal=" + wantedTotal + ", refundedDate=" + refundedDate + ", OpenDate="
				+ OpenDate + ", competitionRate=" + competitionRate + ", StockCoName=" + StockCoName + "]";
	}
	
	
	
	
	
	
	
	
	
	
}
