package org.mifosplatform.portfolio.onetimesale.data;

import java.math.BigDecimal;
import java.util.List;

import org.joda.time.LocalDate;
import org.mifosplatform.portfolio.charge.data.ChargesData;

public class OneTimeSaleData {
	
	private List<ChargesData> chargesDatas;
	private List<ItemData> itemDatas;
	private Long itemId;
	private Long id;
	private String units;
	private String itemCode;
	private String chargeCode;
	private String quantity;
	private BigDecimal unitPrice;
	private BigDecimal totalPrice;
	private LocalDate saleDate;
	

	public OneTimeSaleData(List<ChargesData> chargeDatas,
			List<ItemData> itemData) {
		
		this.chargesDatas=chargeDatas;
		this.itemDatas=itemData;
		
	}


	public OneTimeSaleData(Long id, LocalDate saleDate, String itemCode,
			String chargeCode, String quantity, BigDecimal totalPrice) {
		this.id=id;
		this.saleDate=saleDate;
		this.itemCode=itemCode;
		this.chargeCode=chargeCode;
		this.quantity=quantity;
		this.totalPrice=totalPrice;
		
	}


	public List<ChargesData> getChargesDatas() {
		return chargesDatas;
	}


	public List<ItemData> getItemDatas() {
		return itemDatas;
	}


	public Long getItemId() {
		return itemId;
	}


	public String getUnits() {
		return units;
	}


	public String getChargeCode() {
		return chargeCode;
	}


	public String getQuantity() {
		return quantity;
	}


	public BigDecimal getUnitPrice() {
		return unitPrice;
	}


	public BigDecimal getTotalPrice() {
		return totalPrice;
	}


	public LocalDate getSaleDate() {
		return saleDate;
	}
	
	

}
