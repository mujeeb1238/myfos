package org.mifosplatform.portfolio.invoicethread.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.joda.time.LocalDate;
import org.mifosplatform.portfolio.billingorder.service.InvoiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Path("/bulkinvoice")
@Component
@Scope("singleton")
public class InvoiceTaskExecutorApi {
	
	InvoiceClient invoiceClient;
	
	@Autowired
	InvoiceTaskExecutorApi(InvoiceClient invoiceClient){
		this.invoiceClient = invoiceClient;
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response bulkInvoiceTaskExecutor(){
		
		invoiceClient.invoicingSingleClient(101l, new LocalDate());
		return null;
		
	}

}
