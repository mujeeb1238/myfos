package org.mifosplatform.portfolio.employee.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.mifosplatform.infrastructure.core.service.TenantAwareRoutingDataSource;
import org.mifosplatform.portfolio.employee.data.EmployeeData;
import org.mifosplatform.portfolio.employee.domain.Employee;
import org.mifosplatform.portfolio.servicemaster.data.SericeMasterOptionsData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
public class EmployeeReadPlatformServiceImp implements EmployeeReadPlatformService {

	
	private final JdbcTemplate jdbcTemplate;
	@Autowired
	EmployeeReadPlatformServiceImp(final TenantAwareRoutingDataSource dataSource){
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	
	@Override
	public List<EmployeeData> retriveEmployees() {

		EmployeeMapper em = new EmployeeMapper();
		String sql = "select "+em.schema();
		return this.jdbcTemplate.query(sql, em, new Object[] {});
	}
	
	protected static final class EmployeeMapper implements RowMapper<EmployeeData>{

		@Override
		public EmployeeData mapRow(ResultSet rs, int rowNum)throws SQLException {
			Long id = rs.getLong("id");
			String employeeName = rs.getString("employeeName");
			String employeeDescription = rs.getString("employeeDescription");
			Long mobileNumber = rs.getLong("mobileNumber");
			String email = rs.getString("email");
			String street = rs.getString("street");
			String city = rs.getString("city");
			String state = rs.getString("state");
			String intermediate = rs.getString("intermediate");
			String degree = rs.getString("degree");
			String doctorate = rs.getString("doctorate");
			String twoWheel = rs.getString("two_wheel");
			String fourWheel = rs.getString("four_wheel");
			
			return new EmployeeData(id,employeeName,employeeDescription,mobileNumber,email,street,city,state,intermediate,degree,doctorate,twoWheel,fourWheel);
		}
		public String schema() {
			return "e.id as id, e.employee_name as employeeName , e.employee_description as employeeDescription, e.mobile_number as mobileNumber,e.email as email, a.street as street, a.city as city, a.state as state edu.intermediate as intermediate, edu.degree as degree, edu.doctorate as doctorate, pro.two_wheel as twoWheel,pro.fourWheel as fourWheel FROM employee as e,education as edu INNER JOIN address as a, property as pro ON e.id=a.emp_id and edu.emp_id=pro.emp_id";
					
					//"e.id as id,e.employee_name as employeeName , e.employee_description as employeeDescription, e.mobile_number as mobileNumber,e.email as email from employee e";
		}
		
	} 
	
	
	
	@Override
	public EmployeeData retriveIndividualEmployee(Long employeeId) {
		EmployeeMapper emp = new EmployeeMapper();
		String sql ="select e.id as id, e.employee_name as employeeName, e.employee_description as employeeDescription, e.mobile_number as mobileNumber, e.email as email, a.street as street, a.city as city, a.state as state FROM employee AS e LEFT JOIN address AS a ON e.id = a.emp_id WHERE e.id = "+employeeId;  
				//"select e.id as id,e.employee_name as employeeName,e.employee_description as employeeDescription,e.mobile_number as mobileNumber,e.email as email from employee e where id="+employeeId+"";
		
		return this.jdbcTemplate.queryForObject(sql,emp);
	}

	protected static final class IndividualEmploye implements RowMapper<EmployeeData>{
		public EmployeeData mapRow(ResultSet rs,int col){
			try {
				Long id = rs.getLong("id");
				String employeeName = rs.getString("employeeName");
				String employeeDescription = rs.getString("employeeDescription");
				Long mobileNumber = rs.getLong("mobileNumber");
				String email = rs.getString("email");
				String street = rs.getString("street");
				String city = rs.getString("city");
				String state = rs.getString("state");
				String intermediate = rs.getString("intermediate");
				String degree = rs.getString("degree");
				String doctorate = rs.getString("doctorate");
				String twoWheel = rs.getString("two_wheel");
				String fourWheel = rs.getString("four_wheel");
				return new EmployeeData(id,employeeName,employeeDescription,mobileNumber,email,street,city,state,intermediate,degree,doctorate,twoWheel,fourWheel);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			return null;
			
		}
		
	}
	
}
