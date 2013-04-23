package org.mifosplatform.portfolio.employee.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.AbstractPersistable;


@Entity
@Table(name="property")
public class EmployeeProperty extends AbstractPersistable<Long>{

	@Column(name="two_wheel",nullable=false,length=100)
	private String twoWheel;
	
	@Column(name="four_wheel",nullable=false,length=100)
	private String fourWheel;
	
	 @ManyToOne(optional = false)
	 @JoinColumn(name = "emp_id")
	private Employee employee;
	
	
	public Employee getEmployee() {
		return employee;
	}
	
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	
	
	public String getTwoWheel() {
		return twoWheel;
	}
	public void setTwoWheel(String twoWheel) {
		this.twoWheel = twoWheel;
	}
	public String getFourWheel() {
		return fourWheel;
	}
	public void setFourWheel(String fourWheel) {
		this.fourWheel = fourWheel;
	}
	
	public EmployeeProperty(){}
	
	public EmployeeProperty(String twoWheel,String fourWheel){
		
		this.twoWheel = twoWheel;
		this.fourWheel = fourWheel;
	}
	
	public void update(Employee employee){
		this.employee = employee;
	}
	
}
