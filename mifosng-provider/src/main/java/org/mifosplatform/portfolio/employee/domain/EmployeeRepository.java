package org.mifosplatform.portfolio.employee.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EmployeeRepository extends JpaRepository<Employee,Long>,JpaSpecificationExecutor<Employee>{

}
