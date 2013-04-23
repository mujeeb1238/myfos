package org.mifosplatform.portfolio.employee.service;

import org.mifosplatform.infrastructure.core.data.CommandProcessingResult;
import org.mifosplatform.portfolio.employee.command.EmployeeCommand;

public interface EmployeeWritePlatformService {

	public CommandProcessingResult createNewEmployee(final EmployeeCommand command);
	public CommandProcessingResult updateEmployee(EmployeeCommand employee,Long employeeId);
	public void deleteEmployee(Long eemployeeId);
	
}
