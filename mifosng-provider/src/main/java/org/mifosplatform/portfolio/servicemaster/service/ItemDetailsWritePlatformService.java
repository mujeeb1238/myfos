package org.mifosplatform.portfolio.servicemaster.service;

import org.mifosplatform.infrastructure.core.data.CommandProcessingResult;
import org.mifosplatform.portfolio.inventory.command.InventoryItemDetailsCommand;

public interface ItemDetailsWritePlatformService {

	public CommandProcessingResult addItem(final InventoryItemDetailsCommand command);
	
}
