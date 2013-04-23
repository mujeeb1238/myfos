package org.mifosplatform.portfolio.employee.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.AbstractPersistable;

@Entity
@Table(name="address")
public class EmployeeAddress extends AbstractPersistable<Long>{
	
	@Column(name="street",nullable=false,length=100)
	private String street;
	
	@Column(name="city",nullable=false,length=100)
	private String city;
	
	@Column(name="state")
	private String state;
	
	 @ManyToOne(optional = false)
	 @JoinColumn(name = "emp_id")
	private Employee employee;
	
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	public EmployeeAddress(){
		
	}
	
	public EmployeeAddress(String street,String city, String state){
		this.street = street;
		this.city = city;
		this.state = state;
	}
	public void updateEmployee(Employee employee) {
		this.employee = employee;
	}
	
}
