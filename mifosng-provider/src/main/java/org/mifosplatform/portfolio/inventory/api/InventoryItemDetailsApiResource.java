package org.mifosplatform.portfolio.inventory.api;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.mifosplatform.infrastructure.core.api.ApiParameterHelper;
import org.mifosplatform.infrastructure.core.data.ApiParameterError;
import org.mifosplatform.infrastructure.core.data.CommandProcessingResult;
import org.mifosplatform.infrastructure.core.data.DataValidatorBuilder;
import org.mifosplatform.portfolio.billingproduct.PortfolioApiDataBillingConversionService;
import org.mifosplatform.portfolio.billingproduct.PortfolioApiJsonBillingSerializerService;
import org.mifosplatform.portfolio.inventory.command.InventoryItemDetailsCommand;
import org.mifosplatform.portfolio.inventory.data.InventoryGrnData;
import org.mifosplatform.portfolio.inventory.data.InventoryItemDetailsData;
import org.mifosplatform.portfolio.inventory.exception.InventoryItemDetailsExist;
import org.mifosplatform.portfolio.inventory.service.InventoryGrnReadPlatformService;
import org.mifosplatform.portfolio.inventory.service.InventoryItemDetailsReadPlatformService;
import org.mifosplatform.portfolio.inventory.service.InventoryItemDetailsWritePlatformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Path("/itemdetails")
@Component
@Scope("singleton")
public class InventoryItemDetailsApiResource {

	@Autowired
	private InventoryItemDetailsWritePlatformService inventoryItemDetailsWritePlatformService;

	@Autowired
	private PortfolioApiDataBillingConversionService apiDataConversionService;

	@Autowired
	private PortfolioApiJsonBillingSerializerService apiJsonSerializerService;

	@Autowired
	private InventoryItemDetailsReadPlatformService itemDetailsReadPlatformService;

	@Autowired
	private InventoryGrnReadPlatformService inventoryGrnReadPlatformService;

	public InventoryItemDetailsApiResource() {
	}

	/*
	 * for storing item details into item_detail table
	 */
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response addItemDetails(final String jsonRequestBody) {

		final InventoryItemDetailsCommand command = apiDataConversionService.convertJsonToItemDetailsCommand(null, jsonRequestBody);
		CommandProcessingResult id = this.inventoryItemDetailsWritePlatformService.addItem(command);
		return Response.ok().entity(id.getGroupId()).build();
	}

	@GET
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public String retriveItemDetails(@Context final UriInfo uriInfo) {

		Set<String> typicalResponseParameters = new HashSet<String>(
				Arrays.asList("id", "itemMasterId", "serialNumber", "grnId",
						"provisioningSerialNumber", "quality", "status",
						"warranty", "remarks"));

		Set<String> responseParameters = ApiParameterHelper
				.extractFieldsForResponseIfProvided(uriInfo
						.getQueryParameters());

		if (responseParameters.isEmpty()) {
			responseParameters.addAll(typicalResponseParameters);
		}

		boolean prettyPrint = ApiParameterHelper.prettyPrint(uriInfo
				.getQueryParameters());

		List<InventoryItemDetailsData> inventoryItemDetailsData = this.itemDetailsReadPlatformService
				.retriveAllItemDetails();

		return this.apiJsonSerializerService.serializeItemDetailsDataToJson(
				prettyPrint, responseParameters, inventoryItemDetailsData);

	}

	@GET
	@Path("template")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public String grnTemplate(@QueryParam("grnId") final Long grnId,
			@Context final UriInfo uriInfo) {

		Set<String> typicalResponseParameters = new HashSet<String>(Arrays.asList("id", "purchaseDate", "supplierId",
						"itemMasterId", "orderdQuantity", "receivedQuantity"));
		Set<String> responseParameters = ApiParameterHelper.extractFieldsForResponseIfProvided(uriInfo.getQueryParameters());
		if (responseParameters.isEmpty())
			responseParameters.addAll(typicalResponseParameters);

		boolean prettyPrint = ApiParameterHelper.prettyPrint(uriInfo.getQueryParameters());

		InventoryGrnData inventoryGrnData = null;
		boolean val = false;
		if (grnId != null)
			val = this.inventoryGrnReadPlatformService.validateForExist(grnId);
		if (val) {
			List<ApiParameterError> dataValidationErrors = new ArrayList<ApiParameterError>();
			DataValidatorBuilder baseDataValidator = new DataValidatorBuilder(dataValidationErrors).resource("Grn Details");
			baseDataValidator.reset().parameter("id").value(grnId).notBlank().notNull();
			throw new InventoryItemDetailsExist("No Such GrnId","No Such GrnId",""+grnId,""+grnId);//throw new PlatformApiDataValidationException("validation.msg.validation.errors.exist","Validation errors exist.", dataValidationErrors);
		}
		if (grnId == null) {
			inventoryGrnData = new InventoryGrnData();
			return this.apiJsonSerializerService.serializeGrnDataToJson(
					prettyPrint, responseParameters, inventoryGrnData);

		}

		inventoryGrnData = this.inventoryGrnReadPlatformService
				.retriveGrnDetailTemplate(grnId);
		return this.apiJsonSerializerService.serializeGrnDataToJson(
				prettyPrint, responseParameters, inventoryGrnData);
	}

	@GET
	@Path("grn")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public String retriveGrnDetails(@Context final UriInfo uriInfo) {

		Set<String> typicalResponseParameters = new HashSet<String>(
				Arrays.asList("id", "purchaseDate", "supplierId",
						"itemMasterId", "orderdQuantity", "receivedQuantity"));

		Set<String> responseParameters = ApiParameterHelper
				.extractFieldsForResponseIfProvided(uriInfo
						.getQueryParameters());
		if (responseParameters.isEmpty()) {
			responseParameters.addAll(typicalResponseParameters);
		}
		boolean prettyPrint = ApiParameterHelper.prettyPrint(uriInfo
				.getQueryParameters());
		List<InventoryGrnData> inventoryGrnData = this.inventoryGrnReadPlatformService
				.retriveGrnDetails();

		return this.apiJsonSerializerService.serializeGrnDataToJson(
				prettyPrint, responseParameters, inventoryGrnData);
	}

}
