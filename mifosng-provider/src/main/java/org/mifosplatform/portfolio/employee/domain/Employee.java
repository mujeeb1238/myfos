package org.mifosplatform.portfolio.employee.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.mifosplatform.portfolio.employee.command.EmployeeCommand;
import org.mifosplatform.portfolio.savingsdepositaccount.domain.DepositAccountTransaction;
import org.springframework.data.jpa.domain.AbstractPersistable;


@Entity
@Table(name="employee")
public class Employee extends AbstractPersistable<Long>{
	
	
	@Column(name="employee_name", nullable=false,length=100)
	private String employeName;
	
	@Column(name="employee_description",nullable=false,length=100)
	private String employeeDescription;
	
	@Column(name="mobile_number",nullable=false,length=10)
	private Long mobileNumber;
	
	
	@Column(name="email",nullable=false,length=100)
	private String email;
	
	@OrderBy(value = "id")
    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employee", orphanRemoval = true)
    private final List<EmployeeAddress> employeeAddresses = new ArrayList<EmployeeAddress>();

	@OrderBy(value="id")
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(cascade=CascadeType.ALL,mappedBy="employee",orphanRemoval=true)
	private final List<EmployeeEducation> employeeEducations = new ArrayList<EmployeeEducation>();
	
	@OrderBy(value="id")
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(cascade=CascadeType.ALL,mappedBy="employee",orphanRemoval=true)
	private final List<EmployeeProperty> employeeProperties = new ArrayList<EmployeeProperty>();
	
	
	public List<EmployeeAddress> getEmployeeAddresses() {
		return employeeAddresses;
	}


	public List<EmployeeEducation> getEmployeeEducations() {
		return employeeEducations;
	}


	public List<EmployeeProperty> getEmployeeProperties() {
		return employeeProperties;
	}


	public Long getMobileNumber() {
		return mobileNumber;
	}


	public void setMobileNumber(Long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	private Employee(String employeeName,String employeeDescription,Long mobileNumber,String email,String street,String city,String state,String intermediate,String degree,String doctorate,String twoWheel,String fourWheel){
		this.employeName = employeeName;
		this.employeeDescription = employeeDescription;
		this.mobileNumber = mobileNumber;
		this.email = email;
		
		EmployeeAddress employeeAddress = new EmployeeAddress(street,city,state);
		employeeAddress.updateEmployee(this);
		this.employeeAddresses.add(employeeAddress);
		
		EmployeeEducation employeeEducation = new EmployeeEducation(intermediate,degree,doctorate);
		employeeEducation.updateEmployee(this);
		this.employeeEducations.add(employeeEducation);
		
		EmployeeProperty employeeProperty = new EmployeeProperty(twoWheel,fourWheel);
		employeeProperty.update(this);
		this.employeeProperties.add(employeeProperty);
	}
	
	
	public static Employee create(String employeeName,String employeeDescription,Long mobileNumber,String email,String street,String city,String state,String intermediate,String degree,String doctorate,String twoWheel,String fourWheel){
		return new Employee(employeeName,employeeDescription,mobileNumber,email,street,city,state,intermediate,degree,doctorate,twoWheel,fourWheel);
	}
	
	public Employee(){}
	
	public String getEmployeName() {
		return employeName;
	}
	
	
	public void setEmployeName(String employeName) {
		this.employeName = employeName;
	}
	
	
	public String getEmployeeDescription() {
		return employeeDescription;
	}
	
	
	public void setEmployeeDescription(String employeeDescription) {
		this.employeeDescription = employeeDescription;
	}
	
	public void update(EmployeeCommand command) {
		if(command.isEmployeeNameChanged())
		{
			this.employeName=command.getEmployeeName();
		}
		if(command.isEmployeeDescriptionChanged())
		{
			this.employeeDescription=command.getEmployeeDescription();
		}
	}

	
	
	
	
}
