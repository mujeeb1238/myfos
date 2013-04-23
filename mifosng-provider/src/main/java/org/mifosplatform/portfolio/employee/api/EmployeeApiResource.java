package org.mifosplatform.portfolio.employee.api;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.mifosplatform.infrastructure.core.api.ApiParameterHelper;
import org.mifosplatform.infrastructure.core.data.CommandProcessingResult;
import org.mifosplatform.portfolio.billingproduct.PortfolioApiDataBillingConversionService;
import org.mifosplatform.portfolio.billingproduct.PortfolioApiJsonBillingSerializerService;
import org.mifosplatform.portfolio.employee.command.EmployeeCommand;
import org.mifosplatform.portfolio.employee.data.EmployeeData;
import org.mifosplatform.portfolio.employee.service.EmployeeReadPlatformService;
import org.mifosplatform.portfolio.employee.service.EmployeeWritePlatformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Path("/employees")
@Component
@Scope("singleton")
public class EmployeeApiResource {

	@Autowired
	private EmployeeReadPlatformService employeeReadPlatformService;
	
	@Autowired
	private EmployeeWritePlatformService employeWritePlatformService;
	
	@Autowired
	private PortfolioApiDataBillingConversionService apiDataConversionService;
	
	@Autowired
	private PortfolioApiJsonBillingSerializerService apiJsonSerializerService;
	

	
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createEmployee(String jsonRequestBody){
		
		final EmployeeCommand command = this.apiDataConversionService.convertJsonToEmployeeCommand(null,jsonRequestBody);
		CommandProcessingResult id = this.employeWritePlatformService.createNewEmployee(command);
		return Response.ok().entity(id).build();
		
	}
	
	@GET
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public String retriveAllemployees(@Context final UriInfo uriInfo) {

		Set<String> typicalResponseParameters = new HashSet<String>(Arrays.asList("id","employeeName","employeeDescription","mobileNumber","email","street","city","state","intermediate","degree","doctorate","twoWheel","fourWheel"));

		Set<String> responseParameters = ApiParameterHelper.extractFieldsForResponseIfProvided(uriInfo.getQueryParameters());
		if (responseParameters.isEmpty()) {
			responseParameters.addAll(typicalResponseParameters);
		}
		boolean prettyPrint = ApiParameterHelper.prettyPrint(uriInfo.getQueryParameters());
	
		List<EmployeeData> employees = this.employeeReadPlatformService.retriveEmployees();
		
		return this.apiJsonSerializerService.serializeEmployeeDataToJson(prettyPrint, responseParameters, employees);
	}
	
	@GET
	@Path("employeeID/{employeeId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public String retriveIndividualEmployee(@PathParam("employeeId") final Long employeeId,@Context final UriInfo uriInfo){
		
		Set<String> typicalResponseParameters = new HashSet<String>(Arrays.asList("id","employeeName","employeeDescription","mobileNumber","email","street","city","state"));
		Set<String> responseParameters = ApiParameterHelper.extractFieldsForResponseIfProvided(uriInfo.getQueryParameters());
		if(responseParameters.isEmpty()){
			responseParameters.addAll(typicalResponseParameters);
		}
		boolean prettyPrint = ApiParameterHelper.prettyPrint(uriInfo.getQueryParameters());
		EmployeeData employees = this.employeeReadPlatformService.retriveIndividualEmployee(employeeId);
		return this.apiJsonSerializerService.serializeEmployeeDataToJson(prettyPrint, responseParameters, employees);
		
	}
	
}
