package org.mifosplatform.portfolio.inventory.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface InventoryItemDetailsRepository extends JpaRepository<InventoryItemDetails, Long>, JpaSpecificationExecutor<InventoryItemDetails>{

}


