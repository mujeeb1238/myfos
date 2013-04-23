package org.mifosplatform.portfolio.employee.service;

import java.util.List;

import org.mifosplatform.infrastructure.core.data.CommandProcessingResult;
import org.mifosplatform.portfolio.employee.command.EmployeeCommand;
import org.mifosplatform.portfolio.employee.domain.Employee;
import org.mifosplatform.portfolio.employee.domain.EmployeeCommandValidator;
import org.mifosplatform.portfolio.employee.domain.EmployeeRepository;
import org.mifosplatform.portfolio.servicemaster.domain.ServiceMaster;
import org.mifosplatform.portfolio.servicemaster.exceptions.ServiceCodeExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.mifosplatform.portfolio.employee.exception.EmployeeExistException;;

@Service
public class EmployeeWritePlatefomrServiceImp implements EmployeeWritePlatformService {

	private final EmployeeRepository employeeRepository;
	
	@Autowired
	EmployeeWritePlatefomrServiceImp(final EmployeeRepository employeeRepository){
		
		this.employeeRepository = employeeRepository;
	}
	
	@Transactional
	@Override
	public CommandProcessingResult createNewEmployee(EmployeeCommand command) {
		
		try{
			
		EmployeeCommandValidator validator = new EmployeeCommandValidator(command);
		validator.validateForCreate();
		
		List<Employee> availEmployee = this.employeeRepository.findAll();
				
		for(Employee emp:availEmployee){
			String empName1 = emp.getEmployeName();
			String empName2 = command.getEmployeeName();
			if(empName1.equalsIgnoreCase(empName2)){
				throw new EmployeeExistException(empName2);
			}
		}
		
		Employee employee = Employee.create(command.getEmployeeName(),command.getEmployeeDescription(),command.getMobileNumber(),command.getEmail(),command.getStreet(),command.getCity(),command.getState(),command.getIntermediate(),command.getDegree(),command.getDoctorate(),command.getTwoWheel(),command.getFourWheel());
		System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4"+employee.getEmail()+""+employee.getEmployeeDescription()+""+employee.getEmployeName()+""+employee.getId()+""+employee.getMobileNumber()+"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
		this.employeeRepository.save(employee);
			
		return new CommandProcessingResult(employee.getId());
		
		} catch (DataIntegrityViolationException dve) {
			return new CommandProcessingResult(Long.valueOf(-1));
		}
	}

	@Override
	public CommandProcessingResult updateEmployee(EmployeeCommand employee, Long employeeId) {
		
		return null;
	}

	@Override
	public void deleteEmployee(Long eemployeeId) {
		
		
	}

}
