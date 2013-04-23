package org.mifosplatform.portfolio.employee.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.AbstractPersistable;


@Entity
@Table(name="education")
public class EmployeeEducation extends AbstractPersistable<Long>{

	@Column(name="intermediate",nullable=true,length=100)
	private String intermediate;
	
	@Column(name="degree",nullable=true,length=100)
	private String degree;

	@Column(name="doctorate",nullable=true,length=100)
	private String doctorate;

	@ManyToOne(optional=false)
	@JoinColumn(name="emp_id")
	private Employee employee;

	
	

	public EmployeeEducation(){
		
	}
	
	public EmployeeEducation(String intermediate,String degree,String doctorate){
		this.intermediate=intermediate;
		this.degree=degree;
		this.doctorate=doctorate;
	}
	
	public void updateEmployee(Employee employee){
		this.employee = employee;
	}
	
	public String getIntermediate() {
		return intermediate;
	}

	public void setIntermediate(String intermediate) {
		this.intermediate = intermediate;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getDoctorate() {
		return doctorate;
	}

	public void setDoctorate(String doctorate) {
		this.doctorate = doctorate;
	}
	
	public Employee getEmployee() {
		return employee;
	}


	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	
}
