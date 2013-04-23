package org.mifosplatform.portfolio.inventory.service;

import java.util.List;

import org.mifosplatform.portfolio.inventory.data.InventoryItemDetailsData;

public interface InventoryItemDetailsReadPlatformService {

	
	public List<InventoryItemDetailsData> retriveAllItemDetails();
	
	public InventoryItemDetailsData retriveIndividualItemDetails();

}
