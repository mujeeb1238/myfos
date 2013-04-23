package org.mifosplatform.portfolio.itemmaster.domain;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.AbstractPersistable;

@Entity
@Table(name = "item_master")
public class ItemMaster extends AbstractPersistable<Long>{


	@Column(name = "item_code")
	private String itemCode;

	@Column(name = "unit_price")
	private BigDecimal unitPrice;
	
	@Column(name = "item_description")
	private String itemDescription;

	@Column(name = "item_class")
	private String itemClass;
	
	@Column(name = "units")
	private String units;
	
	@Column(name = "charge_code")
	private String chargeCode;

	
	@Column(name = "warranty")
	private int warranty;

	@Column(name = "is_deleted", nullable = false)
	private char deleted = 'n';
	
	public ItemMaster(){}

	public String getItemCode() {
		return itemCode;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public String getItemDescription() {
		return itemDescription;
	}

	public String getItemClass() {
		return itemClass;
	}

	public String getUnits() {
		return units;
	}

	public String getChargeCode() {
		return chargeCode;
	}

	
	public int getWarranty() {
		return warranty;
	}

	public char getDeleted() {
		return deleted;
	}
	
	
	
	

}
