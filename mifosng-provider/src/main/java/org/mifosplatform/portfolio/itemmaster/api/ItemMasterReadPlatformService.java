package org.mifosplatform.portfolio.itemmaster.api;

import org.mifosplatform.portfolio.onetimesale.data.ItemData;

public interface ItemMasterReadPlatformService {

	ItemData retrieveSingleItem(Long itemId);

}
