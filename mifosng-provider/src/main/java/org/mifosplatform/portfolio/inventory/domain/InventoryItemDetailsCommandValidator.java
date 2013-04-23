package org.mifosplatform.portfolio.inventory.domain;

import java.util.ArrayList;
import java.util.List;

import org.mifosplatform.infrastructure.core.data.ApiParameterError;
import org.mifosplatform.infrastructure.core.data.DataValidatorBuilder;
import org.mifosplatform.infrastructure.core.exception.PlatformApiDataValidationException;
import org.mifosplatform.portfolio.inventory.command.InventoryItemDetailsCommand;

public class InventoryItemDetailsCommandValidator {

	
	private final InventoryItemDetailsCommand command;
	
	
	public InventoryItemDetailsCommand getCommand() {
		return command;
	}

	public InventoryItemDetailsCommandValidator(final InventoryItemDetailsCommand command) {
		this.command=command;
	}
	
/*	
	private String itemMasterId;
	private String serialNumber;
	private String grnId;
	private String provisioningSerialNumber;
	private String quality;
	private String status;
	private Long officeId;
	private Long clientId;
	private Long warranty;
	private String remark;
	private final Set<String> modifiedParameters;*/	
	public void validateForCreate(){
			List<ApiParameterError> dataValidationErrors = new ArrayList<ApiParameterError>();
			DataValidatorBuilder baseDataValidator = new DataValidatorBuilder(dataValidationErrors).resource("ItemDetails");
			//baseDataValidator.reset().parameter("serviceCode").value(command.getServiceCode()).notBlahnk().notNull();
			baseDataValidator.reset().parameter("itemMasterId").value(command.getItemMasterId()).longGreaterThanZero().notBlank().notNull();
			baseDataValidator.reset().parameter("serialNumber").value(command.getSerialNumber()).notBlank().notNull();
			baseDataValidator.reset().parameter("grnId").value(command.getGrnId()).longGreaterThanZero().notBlank().notNull();
			baseDataValidator.reset().parameter("provisioningSerialNumber").value(command.getProvisioningSerialNumber()).notBlank().notNull();
			baseDataValidator.reset().parameter("quality").value(command.getQuality()).notBlank().notNull();
			baseDataValidator.reset().parameter("status").value(command.getStatus()).notBlank().notNull(); 	
			baseDataValidator.reset().parameter("warranty").value(command.getWarranty()).longGreaterThanZero().notNull();
			baseDataValidator.reset().parameter("remarks").value(command.getRemarks()).notBlank().notNull();
			
			if (!dataValidationErrors.isEmpty()) {
				throw new PlatformApiDataValidationException("validation.msg.validation.errors.exist", "Validation errors exist.", dataValidationErrors);
				//throw new InventoryItemDetailsExist(command.getSerialNumber());
			}
		}
			
			
			
	}


