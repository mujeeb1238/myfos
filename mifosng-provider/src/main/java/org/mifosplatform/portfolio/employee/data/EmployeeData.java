package org.mifosplatform.portfolio.employee.data;

import java.util.Collection;



public class EmployeeData {

	private Collection<EmployeeData> employeeDatas;
	private Long id;
	private String employeeName;
	private String employeeDescription;
	private Long mobileNumber;
	private String email;
	private String street;
	private String city;
	private String state;
	private String intermediate;
	private String degree;
	private String doctorate;
	private String twoWheel;
	private String fourWheel;
	
	
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(Long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public EmployeeData(){}
	
	public void setEmployeeDatas(Collection<EmployeeData> employeeDatas) {
		this.employeeDatas = employeeDatas;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}



	public void setEmployeeDescription(String employeeDescription) {
		this.employeeDescription = employeeDescription;
	}



	public EmployeeData(Collection<EmployeeData> employeeDatas){
		this.employeeDatas=employeeDatas;
	}
	
	
	
	public EmployeeData(Long id,String employeeName,String employeeDescription,Long mobileNumber,String email,String street,String city,String state,String intermediate,String degree,String doctorate,String twoWheel,String fourWheel){
		this.id=id;
		this.employeeName = employeeName;
		this.employeeDescription = employeeDescription;
		this.mobileNumber = mobileNumber;
		this.email = email;
		this.street = street;
		this.city = city;
		this.state = state;
		this.intermediate=intermediate;
		this.degree=degree;
		this.doctorate=doctorate;
		this.twoWheel=twoWheel;
		this.fourWheel=fourWheel;
		
	}
	
	
	public Collection<EmployeeData> getEmployeeDatas()
	{
		return employeeDatas;
	}
	
	public Long getId(){
	return id;
	}
	
	public String getEmployeeName(){
		return employeeName;
	}
	
	public String getEmployeeDescription(){
		return employeeDescription;
	}
	
	
	
}
