package org.mifosplatform.portfolio.inventory.service;

import java.util.List;

import org.mifosplatform.portfolio.inventory.data.InventoryGrnData;

public interface InventoryGrnReadPlatformService {

	public List<InventoryGrnData> retriveGrnDetails();
	//public InventoryGrnData retriveGrnDetailTemplate();
	InventoryGrnData retriveGrnDetailTemplate(Long grnId);
	
	public boolean validateForExist(final Long grnId);
	
}
