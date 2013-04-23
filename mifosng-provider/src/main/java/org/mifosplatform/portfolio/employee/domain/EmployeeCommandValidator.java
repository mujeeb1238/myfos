package org.mifosplatform.portfolio.employee.domain;

import java.util.ArrayList;
import java.util.List;

import org.mifosplatform.infrastructure.core.data.ApiParameterError;
import org.mifosplatform.infrastructure.core.data.DataValidatorBuilder;
import org.mifosplatform.infrastructure.core.exception.PlatformApiDataValidationException;
import org.mifosplatform.portfolio.employee.command.EmployeeCommand;

public class EmployeeCommandValidator {

	private final EmployeeCommand command;
	
	public EmployeeCommandValidator(EmployeeCommand command) {
		this.command = command;
	}
	
	public void validateForCreate(){
		
		 List<ApiParameterError> dataValidationErrors = new ArrayList<ApiParameterError>();
			DataValidatorBuilder baseDataValidator = new DataValidatorBuilder(dataValidationErrors).resource("employee... ");
			baseDataValidator.reset().parameter("employeeName").value(command.getEmployeeName()).notBlank().notNull();
			//baseDataValidator.reset().parameter("subscription_type").value(command.getSubscription_type()).notBlank().notNull();
			baseDataValidator.reset().parameter("employeeDescription").value(command.getEmployeeDescription()).notBlank().notNull();
			baseDataValidator.reset().parameter("mobileNumber").value(command.getMobileNumber()).notBlank().notNull();
			baseDataValidator.reset().parameter("email").value(command.getEmail()).notBlank().notNull();
			baseDataValidator.reset().parameter("street").value(command.getStreet()).notBlank().notNull();
			baseDataValidator.reset().parameter("city").value(command.getCity()).notBlank().notNull();
			baseDataValidator.reset().parameter("state").value(command.getState()).notBlank().notNull();
			baseDataValidator.reset().parameter("intermediate").value(command.getIntermediate()).notBlank().notNull();
			baseDataValidator.reset().parameter("degree").value(command.getDegree()).notBlank().notNull();
			baseDataValidator.reset().parameter("doctorate").value(command.getDoctorate()).notBlank().notNull();
			
			if (!dataValidationErrors.isEmpty()) {
				throw new PlatformApiDataValidationException("validation.msg.validation.errors.exist", "Validation errors exist.", dataValidationErrors);
			}

		
		
	}

}
