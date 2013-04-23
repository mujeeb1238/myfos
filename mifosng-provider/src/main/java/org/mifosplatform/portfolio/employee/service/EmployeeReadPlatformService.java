package org.mifosplatform.portfolio.employee.service;

import java.util.List;

import org.mifosplatform.portfolio.employee.data.EmployeeData;
import org.mifosplatform.portfolio.employee.domain.Employee;


public interface EmployeeReadPlatformService {
	
	List<EmployeeData> retriveEmployees();
	
	EmployeeData retriveIndividualEmployee(Long employeeId);
}
