package org.mifosplatform.portfolio.inventory.service;

import org.slf4j.Logger;
import org.mifosplatform.infrastructure.core.data.CommandProcessingResult;
import org.mifosplatform.infrastructure.core.exception.PlatformDataIntegrityException;
import org.mifosplatform.infrastructure.security.service.PlatformSecurityContext;
import org.mifosplatform.portfolio.inventory.command.InventoryItemDetailsCommand;
import org.mifosplatform.portfolio.inventory.domain.InventoryGrn;
import org.mifosplatform.portfolio.inventory.domain.InventoryGrnRepository;
import org.mifosplatform.portfolio.inventory.domain.InventoryItemDetails;
import org.mifosplatform.portfolio.inventory.domain.InventoryItemDetailsCommandValidator;
import org.mifosplatform.portfolio.inventory.domain.InventoryItemDetailsRepository;
import org.mifosplatform.portfolio.inventory.exception.InventoryItemDetailsExist;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class InventoryItemDetailsWritePlatformServiceImp implements InventoryItemDetailsWritePlatformService{
	
	
	private PlatformSecurityContext context;
	private InventoryItemDetailsRepository inventoryItemDetailsRepository;
	private InventoryGrnRepository inventoryGrnRepository;
	
	@Autowired
	public InventoryItemDetailsWritePlatformServiceImp(final PlatformSecurityContext context,InventoryItemDetailsRepository inventoryItemDetailsRepository,InventoryGrnRepository inventoryitemRopository) {
		this.context=context;
		this.inventoryItemDetailsRepository=inventoryItemDetailsRepository;
		this.inventoryGrnRepository=inventoryitemRopository;
	}
	
	private final static Logger logger = (Logger) LoggerFactory.getLogger(InventoryItemDetailsWritePlatformServiceImp.class);
	
	
	
	@Transactional
	@Override
	public CommandProcessingResult addItem(InventoryItemDetailsCommand command) {
		InventoryItemDetails inventoryItemDetails=null;
		try{
			context.authenticatedUser();
			
			this.context.authenticatedUser();
			InventoryItemDetailsCommandValidator validator = new InventoryItemDetailsCommandValidator(command);
			validator.validateForCreate();
			
			/*List<InventoryItemDetails> availService= this.inventoryItemDetailsRepository.findAll();
			
			for(InventoryItemDetails items:availService){
				String serialNumberFromItemDetails = items.getSerialNumber();
				String serialNumberFromItemCommand = command.getSerialNumber();
				if(serialNumberFromItemDetails.equalsIgnoreCase(serialNumberFromItemCommand)){
					throw new InventoryItemDetailsExist("Item is already existing with item SerialNumber: "+command.getSerialNumber(),"Item is already existing with item SerialNumber",command.getSerialNumber(),command.getSerialNumber());
				}
			}*/
			



			
			
			 inventoryItemDetails = new InventoryItemDetails(command.getItemMasterId(), command.getSerialNumber(), command.getGrnId(),command.getProvisioningSerialNumber(), command.getQuality(),command.getStatus(),command.getWarranty(), command.getRemarks());
			 InventoryGrn inventoryGrn = inventoryGrnRepository.findOne(command.getGrnId());
			 
			 if(inventoryGrn.getReceivedQuantity()>=1){
				 inventoryGrn.setReceivedQuantity(inventoryGrn.getReceivedQuantity()-1);
				 this.inventoryGrnRepository.save(inventoryGrn);
			 }else{
				 throw new InventoryItemDetailsExist("received.quantity.is.nill.hence.your.item.details.will.not.be.saved","","","");
			 }
			 this.inventoryItemDetailsRepository.save(inventoryItemDetails);
			 
			
		} catch (DataIntegrityViolationException dve){
				handleDataIntegrityIssues(command, dve); 
			return new CommandProcessingResult(Long.valueOf(-1));
		}
			
		return new CommandProcessingResult(inventoryItemDetails.getId());
	}
	
		private void handleDataIntegrityIssues(final InventoryItemDetailsCommand command, final DataIntegrityViolationException dve) {
	         Throwable realCause = dve.getMostSpecificCause();
	        if (realCause.getMessage().contains("serial_no_constraint")){
	        	throw new PlatformDataIntegrityException("error.msg.inventory.item.duplicate.serialNumber", "Item Details with SerialNumber" + command.getSerialNumber()+ " already exists", "SerialNumber", command.getSerialNumber());
	        }

	        logger.error(dve.getMessage(), dve);
	       // throw new PlatformDataIntegrityException("error.msgdeposit.accountt.unknown.data.integrity.issue","Unknown data integrity issue with resource.");
	    	
	}

}



