package org.mifosplatform.portfolio.inventory.service;

import org.mifosplatform.infrastructure.core.data.CommandProcessingResult;
import org.mifosplatform.portfolio.inventory.command.InventoryItemDetailsCommand;
import org.springframework.dao.DataIntegrityViolationException;

public interface InventoryItemDetailsWritePlatformService {


	CommandProcessingResult addItem(InventoryItemDetailsCommand command);

}
