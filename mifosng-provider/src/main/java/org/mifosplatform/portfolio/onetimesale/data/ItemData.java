package org.mifosplatform.portfolio.onetimesale.data;

import java.math.BigDecimal;
import java.util.List;

public class ItemData {
	
	private Long id;
	private String itemCode;
	private String units;
	private BigDecimal unitPrice;
	private BigDecimal totalPrice;
	private List<ItemData> itemDatas;
	private ItemData itemData;
	private Long quantity;

	public ItemData(Long id, String itemCode, String units, BigDecimal unitPrice) {
		
		this.id=id;
		this.itemCode=itemCode;
		this.units=units;
		this.unitPrice=unitPrice;
		
	}

	public ItemData(List<ItemData> itemCodeData, ItemData itemData, BigDecimal totalPrice,Long quantity) {
		this.itemDatas=itemCodeData;
		this.id=itemData.getId();
		this.itemCode=itemData.getItemCode();
		this.units=itemData.getUnits();
		this.unitPrice=itemData.getUnitPrice();
		this.totalPrice=totalPrice;
		this.quantity=quantity;
	
	}

	public Long getId() {
		return id;
	}

	public String getItemCode() {
		return itemCode;
	}

	public String getUnits() {
		return units;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void set(BigDecimal totalPrice) {
	this.totalPrice=totalPrice;
		
	}

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public List<ItemData> getItemCodeData() {
		return 	itemDatas;
	}

	
}
