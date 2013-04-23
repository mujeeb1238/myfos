package org.mifosplatform.portfolio.employee.exception;

import org.mifosplatform.infrastructure.core.exception.AbstractPlatformDomainRuleException;

public class EmployeeExistException extends AbstractPlatformDomainRuleException{

	public EmployeeExistException(String employeeName){
		super("employee already exist with name: ",employeeName);
	}
	
}
